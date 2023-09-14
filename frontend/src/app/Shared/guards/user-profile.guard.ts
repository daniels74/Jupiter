import { Injectable, OnDestroy, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuth } from '../State/Selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
class AuthCheck implements OnDestroy {
  auth = false;
  sub!: Subscription;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  canActivate() {
    //! No longer in use
    // const sub = this.authService.authState$
    //   .pipe(take(1))
    //   .subscribe((state: any) => {
    //     this.auth = state;
    //   });
    this.sub = this.store.select(selectAuth).subscribe((state: any) => {
      this.auth = state;
    });
    return this.auth;
  }
}

export const userProfileGuard: CanActivateFn = (route, state) => {
  return inject(AuthCheck).canActivate();
};
