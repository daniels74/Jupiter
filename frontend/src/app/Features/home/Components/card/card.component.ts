import { Component, Input } from '@angular/core';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { CryptoService } from '../.././../../Core/Services/crypto.service';
import { AuthService } from '../../../../Core/Services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() dataImage!: string;
  @Input() dataName!: string;
  @Input() dataMarketCapRank!: any;
  @Input() coinId!: string;

  cardHeightExp = window.innerWidth < 700 ? '40rem' : '25rem';
  cardWidthExp = window.innerWidth < 700 ? '25rem' : '15rem';
  fullClass =
    window.innerWidth < 700
      ? {
          height: '40rem',
          width: '19rem',
          flexDirection: 'column',
          // overflowY: 'scroll',
          // overflowX: 'none',
          marginLeft: '3rem',
        }
      : {};

  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService,
    private coinGeckoService: CoinGeckoApiService,
  ) {}

  getMoreInfo() {
    this.coinGeckoService.getSingleCoin(this.coinId).subscribe((res) => {
      console.log('API for single coin working: ', res);
    });
  }

  saveToCollection() {
    this.cryptoService.postCryptoId(this.coinId).subscribe((postRes) => {
      this.authService.setPermissions(postRes.jwt);
    });
  }
}
