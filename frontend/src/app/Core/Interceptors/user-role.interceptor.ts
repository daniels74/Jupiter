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

@Injectable()
export class UserRoleInterceptor implements HttpInterceptor, OnDestroy {
  isAuth = false;
  sub!: Subscription;
  origin = this.window.location.origin; // 'http://localhost:3000';

  constructor(private store: Store, @Inject(WINDOW) private window: Window) {}

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

    const urlValid = request.url.startsWith(this.origin + '/user/updaterole');

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
