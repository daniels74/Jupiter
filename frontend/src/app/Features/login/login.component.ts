import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { finalize, take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { User } from '../../Core/Interfaces/User.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SiteAdjustmentService } from '../../Core/Services/UX/site-adjustment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loadingState = false;
  user!: User;

  // ? Access width and height properties using "window."
  container_width = window.innerWidth <= 700 ? '95%' : '50%';
  container_height = window.innerWidth <= 700 ? '75%' : '50%';
  form_input_container_width = window.innerWidth <= 700 ? '80%' : '50%';
  form_input_container_height = window.innerWidth <= 700 ? '10%' : '20%';

  // ? Small screen = false / Big Screen = true
  sizeState = window.innerWidth < 700 ? false : true;

  lightTheme = true;

  constructor(
    private router: Router,
    private store: Store,
    public spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authServ: AuthService,
    private siteAdjustments: SiteAdjustmentService,
  ) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((theuser) => {
      this.user = theuser;
    });

    this.siteAdjustments.myValue$.subscribe((val) => {
      this.lightTheme = val;
    });
  }

  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get emailInput() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordInput() {
    return this.loginForm.get('password') as FormControl;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // this.clearInvalidCredentialsError();
    this.spinner.show('primary');
    this.loadingState = true;
    this.authServ
      .login(this.emailInput.value, this.passwordInput.value)
      .pipe(
        take(1),
        finalize(() => {
          this.spinner.hide();
          this.loadingState = false;
        }),
      )
      .subscribe({
        next: (ele) => {
          if (!ele?.jwt) {
            this.setInvalidCredentialsError();
            return;
          }
          this.authServ.setPermissions(ele.jwt);
          this.router.navigate(['/user', this.user.id]);
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
      });
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      this.setInvalidCredentialsError();
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
      this.setInvalidCredentialsError();
    }
  }

  private setInvalidCredentialsError(): void {
    this.passwordInput.setErrors({
      ...(this.passwordInput.errors ?? {}),
      invalidCredentials: true,
    });
    this.passwordInput.markAsTouched();
    this.passwordInput.markAsDirty();
  }

  private clearInvalidCredentialsError(): void {
    const currentErrors = this.passwordInput.errors;
    if (!currentErrors?.['invalidCredentials']) {
      return;
    }

    const { invalidCredentials, ...rest } = currentErrors;
    void invalidCredentials;
    this.passwordInput.setErrors(Object.keys(rest).length ? rest : null);
    this.passwordInput.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false,
    });
  }
}
