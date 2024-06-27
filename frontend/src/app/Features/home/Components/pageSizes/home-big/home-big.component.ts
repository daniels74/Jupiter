import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CryptoCoinObj,
  NFT,
} from '../../../../../Core/Interfaces/top-trending';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-big',
  templateUrl: './home-big.component.html',
  styleUrls: ['./home-big.component.scss'],
})
export class HomeBigComponent {
  @Output() toggleContentStateEvent = new EventEmitter();

  @Input() crypto$!: Observable<Array<CryptoCoinObj>>;

  @Input() nfts$!: Observable<Array<NFT>>;

  @Input() trendingContent_state = false;

  @Input() selectedContent = 'Crypto';

  @Input() cryptoCollection!: any[];

  @Input() nftCollection!: any[];

  constructor(public spinner: NgxSpinnerService) {}

  ngOnInit() {
    console.log('User Cryptos in home : ', this.cryptoCollection);
    console.log('User NFTS in Home: ', this.nftCollection);
  }

  toggleContentState() {
    this.crypto$.subscribe((crypto) => {
      console.log('Crypto collection: ', crypto);
    });
    this.toggleContentStateEvent.emit();
  }
}
