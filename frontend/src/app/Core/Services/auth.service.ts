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
import { CryptoService } from './crypto.service';

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
    @Inject(WINDOW) private window: Window,
  ) {}

  origin = 'http://localhost:3000'; // this.window.location.origin;

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

    this.CryptoService.setCryptoSingleCoins(cryptoCollection_ngrx);

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
