import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../Core/Interfaces/User.interface';
import { UserService } from '../../Core/Services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, map, switchMap } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { CryptoId } from '../../Core/Interfaces/top-trending';
import { CryptoService } from '../../Core/Services/crypto.service';
import { selectUserCryptoCollection } from '../../Shared/State/Selectors/userCryptoCollection.selector';
import { userCryptoCollectionAction } from '../../Shared/State/Actions/userCryptoCollection.actions';
import { CoinGeckoApiService } from '../../Core/Services/coin-gecko-api.service';

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

  // ? Screen Sizing
  // False if small screen / True if Big screen
  isBigScreen = window.innerWidth < 700 ? false : true;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private authServ: AuthService,
    private cryptoService: CryptoService,
    private CoinGecko: CoinGeckoApiService,
  ) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((currentUser) => {
      console.log('In user: ', currentUser);
      this.user = currentUser;
    });

    this.cryptoService.cryptoSingleCoinListObservable.subscribe((coinList) => {
      this.cryptoCollection = coinList;
      console.log('My collection full: ', this.cryptoCollection);
    });
  }

  updateUserForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  get nameControl() {
    return this.updateUserForm.get('name') as FormControl;
  }

  get usernameControl() {
    return this.updateUserForm.get('username') as FormControl;
  }

  get emailControl() {
    return this.updateUserForm.get('email') as FormControl;
  }

  toggleSettings() {
    this.settingState = !this.settingState;
  }

  updateUser() {
    //// Ready the data to be updated
    const updates: any = {
      // email: this.emailControl.value,
      name: this.nameControl.value ? this.nameControl.value : 'No name',
      username: this.usernameControl.value
        ? this.usernameControl.value
        : 'no username',
    };
    //// Update user data
    this.userServ.updateUser(updates, this.user).subscribe((res) => {
      this.authServ.setPermissions(res.jwt);
    });
    return;
  }

  cryptoForm: FormGroup = this.formBuilder.group({
    cryptoidd: new FormControl(''),
  });

  addCryptoToList() {
    const chosenCryptoId = this.cryptoForm.get('cryptoidd')?.value;
    this.cryptoService.postCryptoId(chosenCryptoId).subscribe((res) => {
      console.log('Poseted to database throught fe: ', res);
      this.authServ.setPermissions(res.jwt);
    });
  }

  deleteCryptoId(id: string) {
    this.cryptoService.deleteCryptoId(id).subscribe((res) => {
      console.log('Deleted res: ', res);
      this.authServ.setPermissions(res.jwt);
      // this.setSingleCoins();
    });
  }

  //! Does not return new jwt so does not update this user's crypto list redux state
  deleteCryptoEntryById(cryptoid: number) {
    this.cryptoService.deleteCryptoEntryById(cryptoid).subscribe((res) => {
      console.log('CryptoId Deleted: ', res);
    });
  }
}
