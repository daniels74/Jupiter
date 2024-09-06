import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { merge, switchMap } from 'rxjs';
import { JwtObj } from '../../Core/Interfaces/jwt-obj';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { User } from '../../Core/Interfaces/User.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user!: User;
  loadingState = false;

  // ? Access width and height properties using "window."
  container_width = window.innerWidth <= 700 ? '95%' : '50%';
  container_height = window.innerWidth <= 700 ? '75%' : '50%';
  form_input_container_width = window.innerWidth <= 700 ? '80%' : '50%';
  form_input_container_height = window.innerWidth <= 700 ? '10%' : '20%';

  emailErrorMessage = signal('');

  passwordErrorMessage = signal('');

  constructor(
    public spinner: NgxSpinnerService,
    private authServ: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
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

  ngOnInit() {
    this.store.select(selectUser).subscribe((theuser) => {
      this.user = theuser;
    });
  }

  registerForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get emailInput() {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordInput() {
    return this.registerForm.get('password') as FormControl;
  }

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

  registerUser() {
    this.spinner.show('primary');
    this.loadingState = true;
    this.authServ
      .register(this.emailInput.value, this.passwordInput.value)
      .pipe<JwtObj>(
        switchMap((user) => {
          console.log('Usercreated', user);
          return this.authServ.login(
            this.emailInput.value,
            this.passwordInput.value,
          );
        }),
      )
      .subscribe((jwt: JwtObj) => {
        setTimeout(() => {
          this.spinner.hide();
          this.loadingState = false;
          this.authServ.setPermissions(jwt.jwt);
          this.router.navigate(['/user', this.user.id]);
        }, 3000);
      });
  }
}
