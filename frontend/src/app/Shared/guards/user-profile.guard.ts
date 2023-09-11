import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
class AuthCheck {
  constructor(private authService: AuthService) {}
  auth = false;
  canActivate() {
    const sub = this.authService.authState$
      .pipe(take(1))
      .subscribe((state: any) => {
        this.auth = state;
      });
    return this.auth;
  }
}

export const userProfileGuard: CanActivateFn = (route, state) => {
  return inject(AuthCheck).canActivate();
};
