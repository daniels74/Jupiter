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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { User } from '../../Core/Interfaces/User.interface';

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
  form_input_container_width = window.innerWidth <= 700 ? '100%' : '50%';
  form_input_container_height = window.innerWidth <= 700 ? '20%' : '20%';

  constructor(
    public spinner: NgxSpinnerService,
    private authServ: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe((theuser) => {
      this.user = theuser;
    });
  }

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
          this.router.navigate(['/user', this.user.id]);
        }, 3000);
      });
  }
}
