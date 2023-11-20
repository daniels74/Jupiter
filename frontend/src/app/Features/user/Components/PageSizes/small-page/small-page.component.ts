import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../Core/Interfaces/User.interface';
import { SingleCoin } from '../../../../../Core/Interfaces/singleCoin.interface';

@Component({
  selector: 'app-small-page',
  templateUrl: './small-page.component.html',
  styleUrls: ['./small-page.component.css'],
})
export class SmallPageComponent {
  @Input() chartToggler!: boolean;
  @Input() chosenCrypto!: SingleCoin;
  @Output() toggleChart: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeChart: EventEmitter<any> = new EventEmitter<any>();
  @Input() chartActive!: boolean;
  @Input() counter!: number;
  @Output() toggleSettings: EventEmitter<any> = new EventEmitter<any>();
  @Input() settingState!: boolean;
  @Input() user!: User;
  @Input() collectionTypeToggle!: boolean;
  @Input() cryptoCollection!: any;
  @Output() toggleCollectionType: EventEmitter<any> = new EventEmitter<any>();
  @Input() nftCollection: any;
  @Output() updateUser: EventEmitter<any> = new EventEmitter<any>();
  @Input() updateUserForm!: any;
}
