import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtObj } from '../Interfaces/jwt-obj';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { WINDOW } from '../../../app/window-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userServ: UserService,
    @Inject(WINDOW) private window: Window,
  ) {}

  authStateBehaviorSubject$ = new BehaviorSubject<boolean>(false);
  authState$ = this.authStateBehaviorSubject$.asObservable();

  origin = 'http://localhost:3000'; //this.window.location.origin;

  logout() {
    localStorage.removeItem('blog-token');
    this.authStateBehaviorSubject$.next(false);
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

  setPermissions(token: string) {
    localStorage.setItem('blog-token', token);

    const user: any = jwtDecode(token);

    const timer = 60000 * 60;
    setTimeout(() => {
      this.logout();
    }, timer);

    //! Set auth state
    this.authStateBehaviorSubject$.next(true);

    this.userServ.setUserObservable(user.user);

    this.router.navigate(['/user', user.user.id]);
    // this.router.navigate(['home']);
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
