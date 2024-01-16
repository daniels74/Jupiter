import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';
import { MatButtonModule } from '@angular/material/button';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { SingleNFT } from '../../../../Core/Interfaces/singleNFT';
import { CryptoService } from '../../../../Core/Services/UserCollection/crypto.service';
import { AuthService } from '../../../../Core/Services/auth.service';
import { UserNftCollectionService } from '../../../../Core/Services/UserCollection/user-nft-collection.service';

@Component({
  selector: 'mobile-data-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './MobileDataCard.html',
  styleUrls: ['./MobileDataCard.component.css'],
})
export class MobileDatacardComponent {
  @Input() primaryData!: SingleCoin;
  @Input() nftData!: SingleNFT;
  @Input() dataType!: string;
  @Output() activateChart: EventEmitter<any> = new EventEmitter<SingleCoin>();

  constructor(
    private nftsService: UserNftCollectionService,
    private cryptoService: CryptoService,
    private authService: AuthService,
    private coinGeckoApi: CoinGeckoApiService,
  ) {}

  ngOnInit() {
    console.log('NFT: ', this.nftData);
  }

  getChartData(stringId: string) {
    if (this.primaryData) {
      this.coinGeckoApi.getChartData(stringId).subscribe((res) => {
        console.log('User Page Collection Card: getChartData RESPONSE: ', res);
      });
      this.activateChart.emit(this.primaryData);
    }
  }

  removeCrypto(stringId: any) {
    if (this.dataType === 'crypto') {
      this.cryptoService.deleteCryptoId(stringId).subscribe((res) => {
        this.authService.setSessionToken(res.jwt);
        console.log('Crypto Removed from Collection using crypto ID: ', res);
      });
    } else if (this.dataType === 'nft') {
      this.nftsService.deleteNftId(stringId).subscribe((res) => {
        this.authService.setSessionToken(res.jwt);
        console.log('Nft Removed from Collection using Nft ID: ', res);
      });
    }
  }
}
