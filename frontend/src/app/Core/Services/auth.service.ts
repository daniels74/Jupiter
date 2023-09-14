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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private userServ: UserService,
    @Inject(WINDOW) private window: Window,
  ) {}

  origin = this.window.location.origin; // 'http://localhost:3000';

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
    const userState_ngrx = user.user;
    this.store.dispatch(usersAction.setCurrentUserState({ userState_ngrx }));

    this.router.navigate(['/user', user.user.id]);
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
