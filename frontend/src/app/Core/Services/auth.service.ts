import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
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
import { userNftCollectionAction } from '../../Shared/State/Actions/userNftCollection.actions';
import { UserPostService } from './UserPost/user-post.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userPostService: UserPostService,
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

    console.log('SettingPermissions from JWT: ', user.user);

    //// Set 1 hour timer for JWT
    const timer = 60000 * 60;
    setTimeout(() => {
      this.logout();
    }, timer);

    //// Set auth state
    const authState_ngrx = true;
    this.store.dispatch(authAction.setAuthenticationState({ authState_ngrx }));

    //// Set user data State
    const userState_ngrx: User = user.user;
    this.store.dispatch(usersAction.setCurrentUserState({ userState_ngrx }));

    //// Set user's crypto ID collection
    const cryptoCollection_ngrx = userState_ngrx.cryptos;
    this.store.dispatch(
      userCryptoCollectionAction.setUserCryptoCollection({
        cryptoCollection_ngrx,
      }),
    );

    // // Search each crypto and save in an observable of type [] in crypto service
    this.CryptoService.setCryptoSingleCoins();

    //// Set user's nft ID collection
    const nftCollection_ngrx = userState_ngrx.nfts;
    this.store.dispatch(
      userNftCollectionAction.setUserNftCollection({
        nftCollection_ngrx,
      }),
    );
    // // Search each NFT and save in an observable of type [] in NFT service
    this.NftService.setUserFullNftCollection();

    // // Set users Posts
    this.userPostService.userPostsBehaviorSubject.next(user.user.posts);
    //this.router.navigate(['/user', user.user.id]);
  }

  setSessionToken(token: string) {
    localStorage.setItem('blog-token', token);
  }

  liveSessionCheck() {
    const token = localStorage.getItem('blog-token');
    if (token) {
      this.validateJWT(token).subscribe((isValid) => {
        if (isValid) {
          console.log('IS valid');
          this.setPermissions(token);
        } else {
          console.log('No live session');
          localStorage.removeItem('blog-token');
        }
      });
    } else {
      return;
    }
  }

  validateJWT(token: string): Observable<any> {
    return this.http.post(this.origin + '/auth/jwtverification', { token });
  }
}
