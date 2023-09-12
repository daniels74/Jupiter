import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loadingState = false;

  constructor(
    public spinner: NgxSpinnerService,
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

  ngOnInit(): void {
    // this.spinner.show('primary');
    // this.loadingState = true;
  }

  loginUser() {
    this.spinner.show('primary');
    this.loadingState = true;
    this.authServ
      .login(this.emailInput.value, this.passwordInput.value)
      .pipe(take(1))
      .subscribe((ele) => {
        setTimeout(() => {
          this.spinner.hide();
          this.loadingState = false;
          this.authServ.setPermissions(ele.jwt);
        }, 3000);
      });
  }
}
