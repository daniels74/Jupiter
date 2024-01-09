import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CryptoCoinObj, NFT } from '../../Core/Interfaces/top-trending';
import {
  selectCrypto,
  selectNfts,
} from '../../Shared/State/Selectors/crypto.selectors';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private store: Store, public spinner: NgxSpinnerService) {}

  // ? Top trending Crypto
  crypto$: Observable<Array<CryptoCoinObj>> = this.store.select(selectCrypto);

  // ? Top trending NFT
  nfts$: Observable<Array<NFT>> = this.store.select(selectNfts);

  // ? Small screen = false / Big Screen = true
  sizeState = window.innerWidth < 700 ? false : true;

  // ? Determines what to display, crypto || nfts
  trendingContent_state = false;

  // ? Title for content displaying
  selectedContent = 'Crypto';

  toggleContentState() {
    if (this.selectedContent === 'Crypto') {
      this.selectedContent = 'NFTs';
    } else {
      this.selectedContent = 'Crypto';
    }
    this.trendingContent_state = !this.trendingContent_state;
  }
}
