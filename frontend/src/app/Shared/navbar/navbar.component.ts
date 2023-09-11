import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Services/auth.service';
import { UserService } from '../../Core/Services/user.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private authServic: AuthService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.userService.User$.subscribe((user) => {
      this.id = user.id;
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

  logout() {
    this.authServic.logout();
    this.authState = false;
  }
}
