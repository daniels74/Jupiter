import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '../../../Root/app.module';
import { WINDOW } from '../../../window-token';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPostService {
  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    private http: HttpClient,
  ) {}

  origin = this.local_origin ? this.local_origin : this.window.location.origin;
  userPostsBehaviorSubject = new BehaviorSubject<any[]>([]);
  userPostsSubject = this.userPostsBehaviorSubject.asObservable();

  saveNewPost(post: string): Observable<any> {
    return this.http.post(this.origin + '/posting', {
      description: post,
    });
  }
}
