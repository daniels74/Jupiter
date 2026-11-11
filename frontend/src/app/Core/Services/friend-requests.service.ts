import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { BaseUrl } from '../../Root/app.module';
import { WINDOW } from '../../window-token';
import { User } from '../Interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class FriendRequestsService {
  origin = this.local_origin ? this.local_origin : this.window.location.origin;
  readonly sentFriendRequestsChanged$ = new Subject<void>();

  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    private http: HttpClient,
  ) {}

  acceptFriendRequest(newFriendID: number): Observable<any> {
    return this.http.post(this.origin + '/friendrequest' + '/acceptFriend', {
      id: newFriendID,
    });
  }

  denyFriendRequest(deniedFriendID: number): Observable<any> {
    return this.http.post(this.origin + '/friendrequest' + '/denyFriend', {
      id: deniedFriendID,
    });
  }

  sendFriendRequest(id: number): Observable<any> {
    const user: User = {
      id: id,
      email: '',
      name: '',
      role: '',
      username: '',
      cryptos: [],
      nfts: [],
      posts: [],
      profileImage: '',
    };
    return this.http
      .post<any>(this.origin + '/friendrequest', user)
      .pipe(tap(() => this.sentFriendRequestsChanged$.next()));
  }

  cancelFriendRequest(id: number): Observable<any> {
    const user: User = {
      id: id,
      email: '',
      name: '',
      role: '',
      username: '',
      cryptos: [],
      nfts: [],
      posts: [],
      profileImage: '',
    };
    return this.http
      .post(this.origin + '/friendrequest' + '/cancelfriendrequest', user)
      .pipe(tap(() => this.sentFriendRequestsChanged$.next()));
  }

  getFriendsList(): Observable<any> {
    return this.http.post(this.origin + '/friendrequest' + '/friendships', {});
  }

  removeFriend(friendId: number): Observable<any> {
    return this.http.delete(`${this.origin}/friendrequest/friends/${friendId}`);
  }
}
