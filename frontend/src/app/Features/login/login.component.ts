import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authServ: AuthService,
  ) {}

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
    this.authServ
      .login(this.emailInput.value, this.passwordInput.value)
      .pipe(take(1))
      .subscribe((ele) => {
        this.authServ.setPermissions(ele.access_token);
      });
  }
}
