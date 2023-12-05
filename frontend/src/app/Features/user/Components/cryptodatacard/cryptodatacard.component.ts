import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';
import { MatButtonModule } from '@angular/material/button';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';

@Component({
  selector: 'app-cryptodatacard',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './cryptodatacard.component.html',
  styleUrl: './cryptodatacard.component.css',
})
export class CryptodatacardComponent {

  @Input() primaryData!: SingleCoin;
  @Output() activateChart: EventEmitter<any> = new EventEmitter<SingleCoin>();

  constructor(private coinGeckoApi: CoinGeckoApiService){}

  getChartData(stringId: string) {
    this.coinGeckoApi.getChartData(stringId).subscribe((res) => {
      console.log('User Page Collection Card: getChartData RESPONSE: ', res);
    });
    this.activateChart.emit(this.primaryData);
  }
}
