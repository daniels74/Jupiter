import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { catchError, merge, take, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { selectAuth } from '../../Shared/State/Selectors/auth.selector';
import { Router } from '@angular/router';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { User } from '../../Core/Interfaces/User.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor(
    private router: Router,
    private store: Store,
    public spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authServ: AuthService,
  ) {
    merge(this.emailInput.statusChanges, this.emailInput.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateEmailErrorMsg();
      });
    merge(this.passwordInput.statusChanges, this.passwordInput.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updatePasswordErrorMesg();
      });
  }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((theuser) => {
      this.user = theuser;
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

  emailErrorMessage = signal('');

  passwordErrorMessage = signal('');

  updateEmailErrorMsg() {
    if (this.emailInput.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.emailInput.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMesg() {
    if (this.passwordInput.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a value');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  loginUser() {
    this.spinner.show('primary');
    this.loadingState = true;
    this.authServ
      .login(this.emailInput.value, this.passwordInput.value)
      .pipe(take(1))
      .pipe(catchError(this.handleError))
      .subscribe((ele) => {
        setTimeout(() => {
          if (ele) {
            this.spinner.hide();
            this.loadingState = false;
            this.authServ.setPermissions(ele.jwt);
            this.router.navigate(['/user', this.user.id]);
          } else {
            console.log('Password or Email Incorrect ! ');
          }
        }, 3000);
        // this.router.navigate(['/user', this.user.id]);
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
