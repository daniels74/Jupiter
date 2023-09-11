import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginResponse } from '../Interfaces/loginRes.interface';
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

  origin = this.window.location.origin; //'http://localhost:3000';

  register(email: string, password: string) {
    return this.http.post(this.origin + '/user/register', {
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.origin + '/user/login', {
      email,
      password,
    });
    // .pipe(
    //   map((token: LoginResponse) => {
    //     localStorage.setItem('blog-token', token.access_token);
    //     return token;
    //   }),
    // );
  }

  setPermissions(token: string) {
    localStorage.setItem('blog-token', token);

    const user: any = jwtDecode(token);

    console.log('User decoded: ', user);

    const timer = 60000 * 60;
    setTimeout(() => {
      localStorage.removeItem('blog-token');
    }, timer);

    //! Set auth state
    this.authStateBehaviorSubject$.next(true);

    this.userServ.setUserData(user.user);

    this.router.navigate(['/user', user.user.id]);
    // this.router.navigate(['home']);
  }

  logout() {
    localStorage.removeItem('blog-token');
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
