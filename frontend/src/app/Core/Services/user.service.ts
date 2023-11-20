import { Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, take } from 'rxjs';
import { User } from '../Interfaces/User.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from '../../../app/window-token';
import { JwtObj } from '../Interfaces/jwt-obj';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { BaseUrl } from '../../Root/app.module';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit, OnDestroy {
  user!: User;
  userSub!: Subscription;
  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    private route: ActivatedRoute,
    private http: HttpClient,
    private store: Store,
  ) {}
  ngOnInit(): void {
    this.userSub = this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe((currentUser) => {
        this.user = currentUser;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  deleteUser(user: User) {
    return this.http.delete(this.origin + '/user/' + user.id);
  }

  // {name: string, username: string}
  updateUser(userUpdate: any, user: User): Observable<JwtObj> {
    // const updatedUserObject = {
    //   ...user,
    //   ...userUpdate,
    // };
    return this.http.patch<JwtObj>(
      this.origin + '/user/' + user.id,
      userUpdate,
    );
  }

  changeRole(newRole: any, user: User): Observable<JwtObj> {
    return this.http.put<JwtObj>(
      this.origin + '/user/updaterole/' + user.id,
      newRole,
    );
  }

  uploadProfileImage(formmData: FormData): Observable<any> {
    return this.http.post<FormData>(this.origin + '/user/upload', formmData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getProfilePicture(imagename: string) {
    return this.http.get(this.origin + '/user/profile-image/' + imagename);
  }

  findOne(id: number): Observable<any> {
    return this.http.get(this.origin + '/user/' + id).pipe(map((user) => user));
  }
}
