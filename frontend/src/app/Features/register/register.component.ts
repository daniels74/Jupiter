import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { switchMap } from 'rxjs';
import { JwtObj } from '../../Core/Interfaces/jwt-obj';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  loadingState = false;

  constructor(
    public spinner: NgxSpinnerService,
    private authServ: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  registerForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get emailControl() {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
  }

  registerUser() {
    this.spinner.show('primary');
    this.loadingState = true;
    this.authServ
      .register(this.emailControl.value, this.passwordControl.value)
      .pipe<JwtObj>(
        switchMap((user) => {
          console.log('Usercreated', user);
          return this.authServ.login(
            this.emailControl.value,
            this.passwordControl.value,
          );
        }),
      )
      .subscribe((jwt: JwtObj) => {
        setTimeout(() => {
          this.spinner.hide();
          this.loadingState = false;
          this.authServ.setPermissions(jwt.jwt);
        }, 3000);
      });
  }
}
