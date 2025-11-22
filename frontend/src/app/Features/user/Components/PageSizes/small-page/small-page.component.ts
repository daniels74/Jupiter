import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../Core/Interfaces/User.interface';
import { SingleCoin } from '../../../../../Core/Interfaces/singleCoin.interface';
import { UserService } from '../../../../../Core/Services/user.service';

@Component({
  selector: 'app-small-page',
  templateUrl: './small-page2.component.html',
  styleUrls: ['./small-page2.component.css'],
})
export class SmallPageComponent {
  @Input() chartToggler!: boolean;
  @Input() chosenCrypto!: SingleCoin;
  @Output() toggleChart: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeChart: EventEmitter<any> = new EventEmitter<any>();
  // @Input() chartActive!: boolean;
  @Input() counter!: number;

  @Output() toggleSettings: EventEmitter<any> = new EventEmitter<any>();
  @Input() settingState!: boolean;

  // Setting States
  imgSetting_State = false;
  nameSetting_State = false;

  // Img Compressor
  @Output() useCopresserOnImage: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateUser: EventEmitter<any> = new EventEmitter<any>();
  @Input() updateUserForm!: any;

  @Input() user!: User;
  @Input() profilePic!: string;
  @Input() collectionTypeToggle!: boolean;
  @Input() cryptoCollection!: any;
  @Output() toggleCollectionType: EventEmitter<any> = new EventEmitter<any>();
  @Input() nftCollection: any;

  aboutIsActive = false;

  // profilePic!: string;

  constructor(private userService: UserService) {}

  selectedDataState = 'crypto';

  switchDataViews(newState: string) {
    this.selectedDataState = newState;
  }

  togggleImage_Setting() {
    this.imgSetting_State = !this.imgSetting_State;
  }

  togggleName_Setting() {
    this.nameSetting_State = !this.nameSetting_State;
  }

  updateAndToggle() {
    this.updateUser.emit();
    this.imgSetting_State = false;
    this.nameSetting_State = false;
  }

  cancelEdit() {
    this.imgSetting_State = false;
    this.nameSetting_State = false;
  }
}
