import { Injectable, OnDestroy, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, Subscription, catchError, map, of, take } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';
@Injectable({
  providedIn: 'root',
})
class AuthCheck implements OnDestroy {
  auth = false;
  sub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((ele) => {
        if (ele === true) {
          return true;
        }
        console.log('The Authentication Guard has Blocked You.');
        this.router.navigate(['/login']);
        return false;
      }),
      catchError((err) => of(false)),
    );
    //   // .pipe(take(1))
    //   .subscribe((state) => {
    //     // if (state != undefined) {
    //     //   this.auth = true;
    //     // } else {
    //     //   this.auth = false;
    //     //   console.log('The Authentication Guard has Blocked You.');
    //     //   this.router.navigate(['/login']);
    //     // }
  }
}

export const userProfileGuard: CanActivateFn = (route, state) => {
  return inject(AuthCheck).canActivate();
};
