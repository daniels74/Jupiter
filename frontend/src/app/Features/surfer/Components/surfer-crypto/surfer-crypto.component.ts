import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCardComponent } from '../data-card/data-card.component';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';
import { SurferService } from '../../../../Core/Services/surfer.service';

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

  constructor(
    private coinGeckoService: CoinGeckoApiService,
    private surferService: SurferService,
  ) {}
  ngOnInit() {
    // ! Must search cryptos here for delay purposes. Use a spinner here.
    this.surfer.cryptos.forEach((cryptoo: any) => {
      this.coinGeckoService.getSingleCoin(cryptoo.cryptoid).subscribe((res) => {
        if (res) {
          this.cryptoCollection_unfiltered.push(res);
        }
      });
    });
    // this.surferService.surferCryptos$.subscribe((res) => {
    //   this.cryptoCollection_unfiltered = res;
    // });
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
