import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, mergeMap, of, switchMap } from 'rxjs';
import { User } from '../Interfaces/User.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { WINDOW } from 'src/app/window-token';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  user!: User;
  userBehaviorSubject$ = new BehaviorSubject<User>(this.user);
  User$ = this.userBehaviorSubject$.asObservable();
  origin = this.window.location.origin; //'http://localhost:3000';

  constructor(
    @Inject(WINDOW) private window: Window,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setUserData(user: User) {
    this.userBehaviorSubject$.next(user);
  }

  updateUser(userUpdate: any): Observable<any> {
    const updatedUserObject = {
      ...this.userBehaviorSubject$.value,
      ...userUpdate,
    };
    console.log('REST op user', updatedUserObject);
    return this.http.put(
      this.origin + 'user/' + this.userBehaviorSubject$.value.id,
      updatedUserObject,
    );
    // .pipe(
    //   mergeMap(() => {
    //     return this.http.get<User>('http://localhost:3000/user/' + userID);
    //   }),
    // )
    // .pipe(
    //   mergeMap((user) => {
    //     this.userBehaviorSubject$.next(user);
    //     return of(user);
    //   }),
    // );
    ////Create new token and replace
    //     .pipe(
    //       switchMap((jwt: any) => {
    //         this.authService.setPermissions(jwt.jwt);
    //         return of(jwt);
    //       }),
    //     )
  }

  setUserObservable(user: User): void {
    this.userBehaviorSubject$.next(user);
    return;
  }
}
