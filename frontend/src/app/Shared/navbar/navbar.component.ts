import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
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
  loader = false;
  logoLightTheme = true;

  // ? For sizing
  logoWidth = window.innerWidth < 700 ? '70%' : 'auto';
  logoHeight = window.innerWidth < 700 ? 'auto' : '100%';
  screenSizeCheck = window.innerWidth < 700 ? false : true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private store: Store,
    private fb: FormBuilder,
    private authServic: AuthService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
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

  switchMode(isDarkMode: any) {
    const hostClass = isDarkMode.checked
      ? 'mat-app-background theme-dark'
      : 'mat-app-background theme-light';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
    this.logoLightTheme = !isDarkMode.checked;
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
    this.loader = true;
    setTimeout(() => {
      this.settingsToggle = false;
      const authState_ngrx = false;
      this.store.dispatch(
        authAction.setAuthenticationState({ authState_ngrx }),
      );
      this.authServic.logout();
      this.loader = false;
    }, 300);
  }

  login() {
    this.loader = true;
    setTimeout(() => {
      this.menuToggler = false;
      this.settingsToggle = false;
      this.loader = false;
      // this.router.navigate(['/login']);
    }, 300);
  }

  register() {
    this.loader = true;
    setTimeout(() => {
      this.menuToggler = false;
      this.settingsToggle = false;
      this.loader = false;
      // this.router.navigate(['/register']);
    }, 300);
  }

  goToLanding() {
    this.loader = true;
    // this.spinner.show('primary');
    setTimeout(() => {
      this.settingsToggle = false;
      this.loader = false;
      this.menuToggler = false;
      // this.spinner.hide();
      this.router.navigate(['']);
    }, 300);
  }

  goHome() {
    this.loader = true;
    // this.spinner.show('primary');
    // this.router.navigate(['home']);
    setTimeout(() => {
      this.loader = false;
      this.menuToggler = false;
      // this.spinner.hide();
      // this.router.navigate(['home']);
    }, 300);
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
