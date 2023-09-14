import { Component, OnInit } from '@angular/core';
import { User } from '../../Core/Interfaces/User.interface';
import { UserService } from '../../Core/Services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Shared/State/Selectors/users.selector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user!: User;
  settingState = false;
  sub!: Subscription;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private authServ: AuthService,
  ) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((currentUser) => {
      console.log('In user: ', currentUser);
      this.user = currentUser;
    });
  }

  updateUserForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  get nameControl() {
    return this.updateUserForm.get('name') as FormControl;
  }

  get usernameControl() {
    return this.updateUserForm.get('username') as FormControl;
  }

  get emailControl() {
    return this.updateUserForm.get('email') as FormControl;
  }

  toggleSettings() {
    this.settingState = !this.settingState;
  }

  updateUser() {
    //// Ready the data to be updated
    const updates: any = {
      // email: this.emailControl.value,
      name: this.nameControl.value ? this.nameControl.value : this.user.name,
      username: this.usernameControl.value
        ? this.usernameControl.value
        : this.user.username,
    };
    //// Update user data
    this.userServ.updateUser(updates, this.user).subscribe((res) => {
      this.authServ.setPermissions(res.jwt);
    });
    return;
  }
}
