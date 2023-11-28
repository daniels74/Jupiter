import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent {
  @Input() chosenCrypto: SingleCoin = <SingleCoin>{};
  @Input() chartState = false;
  //@Output() toggleDescription: EventEmitter<any> = new EventEmitter<any>();
  // @Input() descriptionToggler = true;
  @Output() closeChart: EventEmitter<any> = new EventEmitter<any>();
  //@Input() isBigScreen = false;

  // False if small screen / True if Big screen
  //isBigScreen = window.innerWidth < 700 ? false : true;

  descriptionToggler = true;

  toggleDescription() {
    this.descriptionToggler = !this.descriptionToggler;
  }


}
