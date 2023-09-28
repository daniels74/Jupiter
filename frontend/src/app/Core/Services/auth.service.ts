import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtObj } from '../Interfaces/jwt-obj';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { WINDOW } from '../../../app/window-token';
import { Store } from '@ngrx/store';
import { authAction } from '../../Shared/State/Actions/auth.actions';
import { usersAction } from '../../Shared/State/Actions/users.actions';
import { userCryptoCollectionAction } from '../../Shared/State/Actions/userCryptoCollection.actions';
import { User } from '../Interfaces/User.interface';
import { CryptoService } from './UserCollection/crypto.service';
import { BaseUrl } from '../../Root/app.module';
import { NFTId } from '../Interfaces/singleNFT';
import { UserNftCollectionService } from './UserCollection/user-nft-collection.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private userServ: UserService,
    private CryptoService: CryptoService,
    private NftService: UserNftCollectionService,
    @Inject(WINDOW) private window: Window,
    @Inject(BaseUrl) private local_origin: string,
  ) {}

  // origin = 'http://localhost:3000';
  // origin = this.window.location.origin;
  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  logout() {
    localStorage.removeItem('blog-token');

    const authState_ngrx = false;
    this.store.dispatch(authAction.setAuthenticationState({ authState_ngrx }));

    this.router.navigate(['']);
  }

  register(email: string, password: string) {
    return this.http.post(this.origin + '/user/register', {
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<JwtObj> {
    return this.http.post<JwtObj>(this.origin + '/user/login', {
      email,
      password,
    });
  }

  setPermissions(token: string): void {
    localStorage.setItem('blog-token', token);

    const user: any = jwtDecode(token);

    console.log('User obj from Jwt decode: ', user.user);

    //// Set 1 hour timer for JWT
    const timer = 60000 * 60;
    setTimeout(() => {
      this.logout();
    }, timer);

    //// Set authState
    const authState_ngrx = true;
    this.store.dispatch(authAction.setAuthenticationState({ authState_ngrx }));

    //// Set userState
    const userState_ngrx: User = user.user;
    this.store.dispatch(usersAction.setCurrentUserState({ userState_ngrx }));

    //// Set user Crypto Collection
    const cryptoCollection_ngrx = userState_ngrx.cryptos;
    this.store.dispatch(
      userCryptoCollectionAction.setUserCryptoCollection({
        cryptoCollection_ngrx,
      }),
    );

    // ? Get all crypto from ids and set array observable
    this.CryptoService.setCryptoSingleCoins(cryptoCollection_ngrx);

    const userNftCollection_ngrx = userState_ngrx.nfts;
    // ! Set up ngrx for nft id user list
    this.NftService.setUserFullNftCollection(userNftCollection_ngrx);

    //this.router.navigate(['/user', user.user.id]);
  }

  liveSessionCheck() {
    const token = localStorage.getItem('blog-token');

    if (token) {
      this.setPermissions(token);
    } else {
      return;
    }
  }
}
