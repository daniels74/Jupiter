import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BaseUrl } from '../../Root/app.module';
import { WINDOW } from '../../window-token';
import { Surfer } from '../Interfaces/surfer.interface';

@Injectable({
  providedIn: 'root',
})
export class SurferService {
  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  surferBehaviorSubject = new BehaviorSubject<Surfer>(<Surfer>{});
  surfer$ = this.surferBehaviorSubject.asObservable();

  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    // private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  getAndSetSurferData(id: any): Observable<any> {
    // const id = this.route.snapshot.paramMap.get('id');
    return this.http.get<Surfer>(this.origin + '/api/user/surfer/' + id).pipe(
      map((surfer) => {
        this.surferBehaviorSubject.next(surfer);
        console.log('SET SURFER OBSERVABLE:  ', this.origin);
        return surfer;
      }),
    );
  }
}
