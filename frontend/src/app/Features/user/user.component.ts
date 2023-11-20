import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../Core/Interfaces/User.interface';
import { UserService } from '../../Core/Services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, concat, map, switchMap, take, timer } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { CryptoId } from '../../Core/Interfaces/top-trending';
import { CryptoService } from '../../Core/Services/UserCollection/crypto.service';
import { selectUserCryptoCollection } from '../../Shared/State/Selectors/userCryptoCollection.selector';
import { userCryptoCollectionAction } from '../../Shared/State/Actions/userCryptoCollection.actions';
import { CoinGeckoApiService } from '../../Core/Services/coin-gecko-api.service';
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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user!: User;
  settingState = false;
  sub!: Subscription;

  allCryptoIds!: any;
  cryptoCollection: any[] = [];
  nftCollection: any[] = [];

  descriptionToggler = true;
  collectionTypeToggle = false; //// Crypto list or Nft list
  chartToggler = false;
  public chart: any;
  cryptoChartData: any[] = [];
  chartActive = false;
  chartloading_timer = 0;
  countDown_Sub!: Subscription;
  counter = 30;
  tick = 1000;

  chosenCrypto!: SingleCoin;

  // ? Screen Sizing
  // False if small screen / True if Big screen
  isBigScreen = window.innerWidth < 700 ? false : true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private authServ: AuthService,
    private cryptoService: CryptoService,
    private UserNftCollectionService: UserNftCollectionService,
    private CoinGeckoApi: CoinGeckoApiService,
    public spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    // USER
    this.store.select(selectUser).subscribe((currentUser) => {
      console.log('In user: ', currentUser);
      this.user = currentUser;
    });
    // Crypto Collection
    this.cryptoService.cryptoCollection_O.subscribe((coinList) => {
      this.cryptoCollection = coinList;
      console.log('My collection full: ', this.cryptoCollection);
    });
    // Retrieve User NFt Collection
    this.UserNftCollectionService.nftCollection.subscribe((usernfts) => {
      this.nftCollection = usernfts;
      console.log('User Nfts: ', this.nftCollection);
    });

    //! See currrent chart data for selected crypto
    this.CoinGeckoApi.marketChartData_O.subscribe((data) => {
      console.log('Market Chart Data: ', data);
      this.cryptoChartData = data;
      if (this.cryptoChartData.length <= 1) {
        this.chartActive = false;
        this.spinner.show('primary');
        this.counter = 30;
        this.countDown_Sub = timer(0, this.tick).subscribe(() => {
          if (this.counter === 0) {
            this.counter = 30;
          } else {
            --this.counter;
          }
        });
      } else {
        this.spinner.hide();
        this.setChart();
        this.chartActive = true;
      }
    });
  }

  setChart() {
    this.lineChartData = {
      labels: this.cryptoChartData.map((ele) => {
        const eleDate = new Date(ele[0]);
        const date = eleDate.getDate();
        const month = eleDate.getMonth();
        const Year = eleDate.getFullYear();
        const day = eleDate.getDay();

        return `${month}, ${date}, ${Year}`;
      }),
      datasets: [
        {
          data: this.cryptoChartData.map((ele) => {
            return ele[1];
          }),
          label: 'USD Price',
          pointRadius: 0,
          pointHitRadius: 4,
          pointBackgroundColor: 'darkblue',
          pointBorderColor: 'lightblue',
          fill: false,
          tension: 0.5,
          backgroundColor: 'blue', // for chart toolbox
          borderColor: 'lightblue', // for line
          borderWidth: 1,
        },
      ],
    };
  }

  updateUserForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  toggleSettings() {
    this.settingState = !this.settingState;
  }

  updateUser() {
    //// Ready the data to be updated
    const updates: any = {
      // email: this.emailControl.value,
      name: this.updateUserForm.get('name')?.value
        ? this.updateUserForm.get('name')?.value
        : 'No name',
      username: this.updateUserForm.get('username')?.value
        ? this.updateUserForm.get('username')?.value
        : 'no username',
    };
    //// Update user data
    this.userServ.updateUser(updates, this.user).subscribe((res) => {
      this.authServ.setPermissions(res.jwt);
    });
    return;
  }

  toggleCollectionType() {
    this.collectionTypeToggle = !this.collectionTypeToggle;
  }

  //! Updates selected coin and toggles chart
  toggleChart(crypto: SingleCoin) {
    this.chartToggler = !this.chartToggler;
    this.chosenCrypto = crypto;
  }

  closeChart() {
    this.chartToggler = false;
  }

  toggleDescription() {
    this.descriptionToggler = !this.descriptionToggler;
  }
}
