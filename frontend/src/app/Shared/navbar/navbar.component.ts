import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Services/auth.service';
import { UserService } from '../../Core/Services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    private authServic: AuthService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.settingsToggle = false;
    this.userService.User$.subscribe((user) => {
      this.id = user.id;
      this.userRole = user.role;
      if (user.username) {
        this.userName = user.username;
      }
    });

    this.authSub = this.authServic.authState$.subscribe(
      (state: any) => (this.authState = state),
    );
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  toggleSettings() {
    this.settingsToggle = !this.settingsToggle;
  }

  deleteAccount() {
    this.userService.deleteUser().subscribe((res) => {
      console.log('Delete res: ', res);
      this.logout();
    });
  }

  logout() {
    this.settingsToggle = false;
    this.authServic.logout();
    this.authState = false;
  }

  roleSelectionForm: FormGroup = this.fb.group({
    role: new FormControl(''),
  });

  changeRole() {
    const role: any = {
      role: this.roleSelectionForm.get('role')?.value,
    };
    this.userService
      .changeRole(role)
      .subscribe((res) => console.log('USer role:', res));
  }
}

// <form action="" [formGroup]="roleForm" (ngSubmit)="changeRole()">
//                 <input [formControl]="roleControl" type="text">
//                 <button type="submit">Submit</button>
//                 {{ roleControl.value }}
//             </form>
