import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    console.log('Profile img and name: ', this.name, this.profilePic);
  }
}
