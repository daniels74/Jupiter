import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-chart-view-small',
  // standalone: true,
  templateUrl: './chart-view-small.component.html',
  styleUrls: ['./chart-view-small.component.css'],
})
export class ChartViewSmallComponent {
  @Input() chosenCrypto!: SingleCoin;
  @Output() closeChart: EventEmitter<any> = new EventEmitter<any>();
  @Input() counter!: any;
  @Input() chartState!: any;

  constructor(private ngxSpinner: NgxSpinnerService) {}

  ngOnInit() {
    console.log('Chosen Crypto: ', this.chosenCrypto);
    if (!this.chartState) {
      this.ngxSpinner.show('primary');
    } else {
      this.ngxSpinner.hide();
    }
  }
}
