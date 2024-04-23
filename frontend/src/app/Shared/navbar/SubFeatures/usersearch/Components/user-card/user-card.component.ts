import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../../../Core/Interfaces/User.interface';
import { Router } from '@angular/router';
import { SurferService } from '../../../../../../Core/Services/surfer.service';
import { FriendRequestsService } from '../../../../../../Core/Services/friend-requests.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() isLast!: boolean;
  @Input() name!: string;
  @Input() email!: string;
  @Input() profilePic!: string;
  @Input() user!: User;
  @Output() closeSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() spinnerSwitchOn: EventEmitter<any> = new EventEmitter<any>();
  @Output() spinnerSwitchOff: EventEmitter<any> = new EventEmitter<any>();

  loadingState = false;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private SurferService: SurferService,
    private friendRequestService: FriendRequestsService,
  ) {}

  ngOnInit(): void {
    console.log('Profile img and name: ', this.name, this.profilePic);
  }

  goToSurferProfile() {
    this.spinnerSwitchOn.emit();
    this.SurferService.getAndSetSurferData(this.user.id).subscribe((surfer) => {
      setTimeout(() => {
        console.log('Surfer Object set as an Observable: ', surfer);
        this.router.navigate(['surfer/{{ user.id }}']);
        this.spinnerSwitchOff.emit();
        this.closeSearch.emit();
      }, 500);
    });
  }

  sendFriendRequest(id: number) {
    this.friendRequestService
      .sendFriendRequest(id)
      .subscribe((res) => console.log('Friend Request Send Response: ', res));
  }
}
