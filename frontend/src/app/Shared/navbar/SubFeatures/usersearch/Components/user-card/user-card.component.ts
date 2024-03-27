import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../../../Core/Interfaces/User.interface';
import { Router } from 'express';
import { SurferService } from '../../../../../../Core/Services/surfer.service';
import { FriendRequestsService } from '../../../../../../Core/Services/friend-requests.service';

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

  constructor(
    private SurferService: SurferService,
    private friendRequestService: FriendRequestsService,
  ) {}

  ngOnInit(): void {
    console.log('Profile img and name: ', this.name, this.profilePic);
  }

  goToSurferProfile() {
    this.SurferService.getSurferData(this.user.id).subscribe((surfer) => {
      console.log('Surfer Object arrived at SearchBar Card:', surfer);
    });
    console.log('USER ID in search bar: ', this.user.id);
    this.closeSearch.emit();
  }

  sendFriendRequest(id: number) {
    this.friendRequestService
      .sendFriendRequest(id)
      .subscribe((res) => console.log('Friend Request Send Response: ', res));
  }
}
