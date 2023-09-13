import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Interfaces/User.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from '../../../app/window-token';
import { JwtObj } from '../Interfaces/jwt-obj';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User;
  userBehaviorSubject$ = new BehaviorSubject<User>(this.user);
  User$ = this.userBehaviorSubject$.asObservable();
  origin = 'http://localhost:3000'; // this.window.location.origin;

  constructor(
    @Inject(WINDOW) private window: Window,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  deleteUser() {
    return this.http.delete(
      this.origin + '/user/' + this.userBehaviorSubject$.value.id,
    );
  }

  updateUser(userUpdate: any): Observable<JwtObj> {
    const updatedUserObject = {
      ...this.userBehaviorSubject$.value,
      ...userUpdate,
    };
    return this.http.put<JwtObj>(
      this.origin + '/user/' + this.userBehaviorSubject$.value.id,
      updatedUserObject,
    );
  }

  changeRole(newRole: any): Observable<any> {
    return this.http.put(
      this.origin + '/user/updaterole/' + this.userBehaviorSubject$.value.id,
      newRole,
    );
  }

  setUserObservable(user: User): void {
    this.userBehaviorSubject$.next(user);
    return;
  }
}
