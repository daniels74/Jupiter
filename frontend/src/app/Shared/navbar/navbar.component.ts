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
import { Router } from '@angular/router';

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
  userRole!: string;
  user!: User;

  // ? Togglers
  menuToggler = false;
  settingsToggle = false;

  // ? For sizing
  logoWidth = window.innerWidth < 700 ? '70%' : '20%';
  screenSizeCheck = window.innerWidth < 700 ? false : true;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authServic: AuthService,
    private userService: UserService,
    private router: Router,
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
    this.menuToggler = false;
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

  login() {
    this.menuToggler = false;
    this.settingsToggle = false;
    this.router.navigate(['/login']);
  }

  register() {
    this.menuToggler = false;
    this.settingsToggle = false;
    this.router.navigate(['/register']);
  }

  goToLanding() {
    this.menuToggler = false;
    this.settingsToggle = false;
    this.router.navigate(['']);
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

  toggleMenu() {
    this.menuToggler = !this.menuToggler;
  }
}
