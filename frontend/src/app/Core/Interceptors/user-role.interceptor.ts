import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuth } from '../../Shared/State/Selectors/auth.selector';
import { WINDOW } from '../../window-token';
import { BaseUrl } from '../../Root/app.module';

@Injectable()
export class UserRoleInterceptor implements HttpInterceptor, OnDestroy {
  isAuth = false;
  sub!: Subscription;
  // origin = 'http://localhost:3000';
  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  constructor(
    @Inject(BaseUrl) private local_origin: string,
    private store: Store,
    @Inject(WINDOW) private window: Window,
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.sub = this.store.select(selectAuth).subscribe((state: any) => {
      this.isAuth = state;
    });

    const urlValid =
      request.url.startsWith(this.origin + '/user/updaterole') ||
      request.url.startsWith(this.origin + '/cryptoid') ||
      request.url.startsWith(this.origin + '/cryptoid/entrydelete/cryptoid') ||
      request.url.startsWith(this.origin + '/nftid');

    if (this.isAuth && urlValid) {
      const token = localStorage.getItem('blog-token');

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
