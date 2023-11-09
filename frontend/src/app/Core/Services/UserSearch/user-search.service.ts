import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '../../../../app/Root/app.module';
import { WINDOW } from '../../../../app/window-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  constructor(
    private http: HttpClient,
    @Inject(WINDOW) private window: Window,
    @Inject(BaseUrl) private local_origin: string,
  ) {}

  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  getUsers(typedName: string): Observable<any> {
    // let results: any;
    return this.http.get(this.origin + '/user', {
      params: { username: typedName },
    });
    //   .subscribe((res) => {
    //     console.log('THE SEARCH RESULTS FROM SERVICE: ', res);
    //     results = res;
    //   });
    // return results;
  }
}
