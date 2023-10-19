import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subscription, retry, timer } from 'rxjs';
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

  shouldRetry(error: HttpErrorResponse) {
    if (error.status === 0 || error.status === 429) {
      return timer(30000);
    }
    throw error;
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
    } else if (
      // request.url.startsWith('https://api.coingecko.com/api/v3/coins/')
      request.url.endsWith('/market_chart?vs_currency=usd&days=7')
    ) {
      return next
        .handle(request)
        .pipe(retry({ count: 10, delay: this.shouldRetry }));
    } else if (request.url.endsWith('/coins/list?include_platform=false')) {
      return next
        .handle(request)
        .pipe(retry({ count: 10, delay: this.shouldRetry }));
    }

    return next.handle(request);
  }
}
