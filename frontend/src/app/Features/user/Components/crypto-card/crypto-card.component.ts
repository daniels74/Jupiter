import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleCoin } from '../../../../Core/Interfaces/singleCoin.interface';
import { AuthService } from '../../../../Core/Services/auth.service';
import { CryptoService } from '../../../../Core/Services/UserCollection/crypto.service';
import { UserNftCollectionService } from '../../../../Core/Services/UserCollection/user-nft-collection.service';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.scss'],
})
export class CryptoCardComponent {
  @Input() crypto!: any; //SingleCoin;
  @Input() nfts!: any;
  @Input() collectionClassifcation!: string;
  @Output() chartStateOutput: EventEmitter<any> =
    new EventEmitter<SingleCoin>();

  // ? Sizing
  isLargeScreen = window.innerWidth < 700 ? false : true;

  extentionState = false;

  isExpanded = false;

  constructor(
    private coinGeckoApi: CoinGeckoApiService,
    private nftsService: UserNftCollectionService,
    private authService: AuthService,
    private cryptoService: CryptoService,
  ) {}

  toggleExtentionState() {
    this.extentionState = !this.extentionState;
  }

  removeCrypto(stringId: string) {
    if (this.collectionClassifcation === 'crypto') {
      this.cryptoService.deleteCryptoId(stringId).subscribe((res) => {
        //this.authService.setSessionToken(res.jwt);
        console.log('Crypto Removed from Collection using crypto ID: ', res);
      });
    } else if (this.collectionClassifcation === 'nft') {
      this.nftsService.deleteNftId(stringId).subscribe((res) => {
        this.authService.setSessionToken(res.jwt);
        console.log('Nft Removed from Collection using Nft ID: ', res);
      });
    }
  }

  // deleteCryptoEntryByIdNumber() {
  //   const id: number = this.crypto.collectionId;
  //   this.cryptoService.deleteCryptoEntryById(id).subscribe((res) => {
  //     console.log('Crypto Removed from Collection using id number: ', res);
  //     this.authService.setPermissions(res.jwt);
  //   });
  // }

  getChartData(stringId: string) {
    this.coinGeckoApi.getChartData(stringId).subscribe((res) => {
      console.log('User Page Collection Card: getChartData RESPONSE: ', res);
    });
    this.chartStateOutput.emit(this.crypto);
  }
}
