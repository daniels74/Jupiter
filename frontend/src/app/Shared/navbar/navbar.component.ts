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
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { SiteAdjustmentService } from '../../Core/Services/UX/site-adjustment.service';
import { set } from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy, OnInit {
  authSub!: Subscription;
  routerSub!: Subscription;
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
  // logoWidth = window.innerWidth < 700 ? '100%' : '40%';
  logoWidth = window.innerWidth < 700 ? 'auto' : 'auto';
  logoHeight = window.innerWidth < 700 ? '90%' : '90%';
  screenSizeCheck = window.innerWidth < 700 ? false : true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private store: Store,
    private fb: FormBuilder,
    private authServic: AuthService,
    private userService: UserService,
    private siteAdjustments: SiteAdjustmentService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.siteAdjustments.myValue$.subscribe((val) => {
      this.logoLightTheme = val;
    });

    // this.renderer.addClass(this.document.body, 'custom-opacity');
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

    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loader = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  switchMode(isDarkMode: any) {
    this.siteAdjustments.toggleTheme();
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
    this.menuToggler = false;
    this.settingsToggle = false;
  }

  register() {
    this.menuToggler = false;
    this.settingsToggle = false;
  }

  goToLanding() {
    this.settingsToggle = false;
    this.menuToggler = false;
    this.router.navigate(['']);
  }

  goToUserProfile() {
    this.settingsToggle = false;
    this.menuToggler = false;
    this.router.navigate(['/user', this.user.id]);
  }

  goHome() {
    this.menuToggler = false;
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
