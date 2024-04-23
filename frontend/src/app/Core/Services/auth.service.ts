import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
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
    private CryptoService: CryptoService,
    private NftService: UserNftCollectionService,
    @Inject(WINDOW) private window: Window,
    @Inject(BaseUrl) private local_origin: string,
  ) {}

  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  authStateBehaviorSub$ = new BehaviorSubject<boolean>(false);
  authState$ = this.authStateBehaviorSub$.asObservable();

  logout() {
    localStorage.removeItem('blog-token');

    this.authStateBehaviorSub$.next(false);
    const authState_ngrx = false;
    this.store.dispatch(authAction.setAuthenticationState({ authState_ngrx }));

    this.router.navigate(['']);
  }

  register(email: string, password: string) {
    return this.http.post(this.origin + '/api/user/register', {
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<JwtObj> {
    return this.http.post<JwtObj>(this.origin + '/api/user/login', {
      email,
      password,
    });
  }

  //! Sets authentication state, User general data, notes, crypto, and nfts
  setPermissions(token: string): void {
    localStorage.setItem('blog-token', token);

    const user: any = jwtDecode(token);

    //// Set 1 hour timer for JWT
    const timer = 60000 * 60;
    setTimeout(() => {
      this.logout();
    }, timer);

    //// Set auth state
    this.authStateBehaviorSub$.next(true);
    const authState_ngrx = true;
    this.store.dispatch(authAction.setAuthenticationState({ authState_ngrx }));

    //// Set user data State
    const userState_ngrx: User = user.user;
    console.log('USer:', user.user);
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
  }

  setSessionToken(token: string) {
    localStorage.setItem('blog-token', token);
  }

  liveSessionCheck() {
    console.log('CHECKING LIVE SESSION...');
    const token = localStorage.getItem('blog-token');
    if (token) {
      this.validateJWT(token).subscribe((isValid) => {
        if (isValid) {
          console.log('Live session');
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

  isAuthenticated(): Observable<boolean> {
    // let auth = false;
    const token = localStorage.getItem('blog-token');
    if (token) {
      return this.http.post<boolean>(this.origin + '/auth/jwtverification', {
        token: token,
      });
      // .pipe(take(1))
      // .subscribe((authState) => {
      // console.log('auth service authState: ', authState);
      // if (authState) {
      //   auth = true;
      //   console.log('auth service authState: ', typeof authState);
      // } else auth = false;

      // return of(true);
      // });
    } else return of(false); //auth = false;
  }

  validateJWT(token: string): Observable<any> {
    return this.http.post(this.origin + '/auth/jwtverification', { token });
  }
}
