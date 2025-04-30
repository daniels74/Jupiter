import { Component, OnInit } from '@angular/core';
import { User } from '../../Core/Interfaces/User.interface';
import { UserService } from '../../Core/Services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { CryptoService } from '../../Core/Services/UserCollection/crypto.service';
import { UserNftCollectionService } from '../../Core/Services/UserCollection/user-nft-collection.service';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  registerables,
} from 'chart.js';
import { SingleCoin } from '../../Core/Interfaces/singleCoin.interface';
import { NgxSpinnerService } from 'ngx-spinner';
Chart.register(...registerables);
import { NgxImageCompressService } from 'ngx-image-compress';
import { NavigationStart, Router } from '@angular/router';
import { LargePageComponent } from './Components/PageSizes/large-page/large-page.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user!: User;
  profilePic = '';
  settingState = false;
  friendRequestList = false;
  userFriendRequestList: any[] = [];
  friendsListState = false;
  sub!: Subscription;

  allCryptoIds!: any;
  cryptoCollection: any[] = [];
  nftCollection: any[] = [];

  descriptionToggler = true; // Determines weather to show info of crypto in chart view
  collectionTypeToggle = false; //// Crypto list or Nft list
  chartState = false; // IMPORTANT

  chosenCrypto!: SingleCoin;

  // False if small screen / True if Big screen
  isBigScreen = window.innerWidth < 700 ? false : true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  myimage = '';

  browserRefresh = false;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private authServ: AuthService,
    private cryptoService: CryptoService,
    private UserNftCollectionService: UserNftCollectionService,
    public spinner: NgxSpinnerService,
    private ngx: NgxImageCompressService,
    private router: Router,
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
  }

  ngOnInit(): void {
    // USER excludes profile img
    this.store.select(selectUser).subscribe((currentUser) => {
      this.user = currentUser;
    });
    // Profile Pic
    this.userServ.findUserImage().subscribe((userimg) => {
      this.profilePic = userimg.profileImage;
    });
    // Top 7 coin research
    this.cryptoService.setCryptoSingleCoins().subscribe((res) => {
      console.log('Looked up top 7 coins and set info: ', res);
    });
    // Crypto Collection
    this.cryptoService.cryptoCollection_O.subscribe((coinList) => {
      this.cryptoCollection = coinList;
    });
    // Nft Collection
    this.UserNftCollectionService.nftCollection.subscribe((usernfts) => {
      this.nftCollection = usernfts;
    });
  }
  // Declare user update form, this form will be passed to child components and changed.
  // Update Function will take values from this form to be submitted to database.
  updateUserForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    profileImage: new FormControl(''),
  });

  toggleSettings() {
    this.settingState = !this.settingState;
  }

  toggleFriendsList() {
    this.friendsListState = !this.friendsListState;
  }

  toggleFriendRequestList() {
    this.friendRequestList = !this.friendRequestList;
  }

  updateUser() {
    //// Ready the data to be updated
    const updates: any = {
      // email: this.emailControl.value,
      name: this.updateUserForm.get('name')?.value
        ? this.updateUserForm.get('name')?.value
        : null,
      username: this.updateUserForm.get('username')?.value
        ? this.updateUserForm.get('username')?.value
        : null,
      profileImage: this.myimage ? this.myimage : null,
    };

    // //// Update user data
    this.userServ
      .updateUser(this.removeObjNulls(updates), this.user)
      .subscribe((res) => {
        this.authServ.setPermissions(res.jwt);

        // Change current profile picture being displayed
        // once the user submits change and only if they
        // actually changed it
        if (this.myimage) {
          this.profilePic = this.myimage;
          console.log('NewImageUpload:', this.profilePic);
          // this.userServ.findUserImage().subscribe((res) => {
          //   this.profilePic = res;
          // });
        }
      });
    return;
  }

  removeObjNulls(obj: any): object {
    for (const prop in obj) {
      if (obj[prop] === null) {
        delete obj[prop];
      }
    }
    return obj;
  }

  MAX_MEGABYTES = 0.03;
  useCopresserOnImage() {
    this.ngx.uploadAndGetImageWithMaxSize(this.MAX_MEGABYTES).then(
      (result: string) => {
        this.myimage = result;
      },
      (result: string) => {
        console.error(
          "The compression algorithm didn't succed! The best size we can do is",
          this.ngx.byteCount(result),
          'bytes',
        );
        this.myimage = result;
      },
    );
  }

  toggleCollectionType() {
    this.collectionTypeToggle = !this.collectionTypeToggle;
  }

  //! Updates selected coin and toggles chart
  selectCryptoChart(crypto: SingleCoin) {
    this.chartState = !this.chartState;
    this.chosenCrypto = crypto;
  }

  closeChart() {
    this.chartState = false;
  }

  toggleDescription() {
    this.descriptionToggler = !this.descriptionToggler;
  }
}
