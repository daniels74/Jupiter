import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCardComponent } from '../data-card/data-card.component';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { Surfer } from '../../../../Core/Interfaces/surfer.interface';
import { CryptoId } from '../../../../Core/Interfaces/top-trending';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';

@Component({
  selector: 'surfer-crypto',
  standalone: true,
  imports: [CommonModule, DataCardComponent],
  templateUrl: './surfer-crypto.component.html',
  styleUrls: ['./surfer-crypto.component.scss'],
})
export class SurferCryptoComponent {
  @Input() surfer!: any;
  cryptoCollection_unfiltered: SingleCoin[] = [];

  constructor(private coinGeckoService: CoinGeckoApiService) {}
  ngOnInit() {
    // ! Must search cryptos here for delay purposes. Use a spinner here.
    this.surfer.cryptos.forEach((cryptoo: any) => {
      this.coinGeckoService.getSingleCoin(cryptoo.cryptoid).subscribe((res) => {
        if (res) {
          this.cryptoCollection_unfiltered.push(res);
        }
      });
    });
  }

  ngOnChanges() {
    this.cryptoCollection_unfiltered.splice(
      0,
      this.cryptoCollection_unfiltered.length,
    );
    this.surfer.cryptos.forEach((cryptoo: any) => {
      this.coinGeckoService.getSingleCoin(cryptoo.cryptoid).subscribe((res) => {
        if (res) {
          this.cryptoCollection_unfiltered.push(res);
        }
      });
    });
  }
}
