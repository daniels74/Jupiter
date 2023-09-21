import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Services/auth.service';
import { UserService } from '../../Core/Services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAuth } from '../State/Selectors/auth.selector';
import { authAction } from '../State/Actions/auth.actions';
import { selectUser } from '../State/Selectors/users.selector';
import { User } from '../../Core/Interfaces/User.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy, OnInit {
  authSub!: Subscription;
  authState: any = false;
  id!: number;
  userName = 'Profile';
  settingsToggle = false;
  userRole!: string;
  user!: User;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authServic: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.settingsToggle = false;

    this.store.select(selectUser).subscribe((currentUser) => {
      this.user = currentUser;
      this.id = currentUser.id;
      this.userRole = currentUser.role;
      if (currentUser.username) {
        this.userName = currentUser.username;
      }
    });

    this.authSub = this.store.select(selectAuth).subscribe((state) => {
      this.authState = state;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  toggleSettings() {
    this.settingsToggle = !this.settingsToggle;
  }

  deleteAccount() {
    this.userService.deleteUser(this.user).subscribe((res) => {
      console.log('Delete res: ', res);
      this.logout();
    });
  }

  logout() {
    this.settingsToggle = false;
    const authState_ngrx = false;
    this.store.dispatch(authAction.setAuthenticationState({ authState_ngrx }));
    this.authServic.logout();
  }

  roleSelectionForm: FormGroup = this.fb.group({
    role: new FormControl(''),
  });

  changeRole() {
    const role: any = {
      role: this.roleSelectionForm.get('role')?.value,
    };
    this.userService.changeRole(role, this.user).subscribe((jwt) => {
      console.log('New updated jwt:', jwt.jwt);
      this.authServic.setPermissions(jwt.jwt);
    });
  }
}
