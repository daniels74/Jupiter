import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CryptoCoinObj, NFT } from '../../Core/Interfaces/top-trending';
import {
  selectCrypto,
  selectNfts,
} from '../../Shared/State/Selectors/crypto.selectors';
import { UserNftCollectionService } from '../../Core/Services/UserCollection/user-nft-collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store,
    private nftService: UserNftCollectionService,
  ) {}
  ngOnInit(): void {
    this.crypto$.subscribe((c) => {
      console.log('Trending Crypto <Home>: ', c);
    });
    this.nfts$.subscribe((n) => {
      console.log('Trending NFTS <Home>: ', n);
    });

    this.nftService.nftCollection.subscribe((nfts) => {
      console.log('my nfts: ', nfts);
    });
  }

  crypto$: Observable<Array<CryptoCoinObj>> = this.store.select(selectCrypto);

  nfts$: Observable<Array<NFT>> = this.store.select(selectNfts);

  isBigScreen = window.innerWidth > 700 ? 'flex' : 'none';
  isSmallScreen = window.innerWidth < 700 ? 'flex' : 'none';

  //displayNFTS = window.innerWidth > 700 ? true : false;
  content_toggler = false;

  selectedContent = 'Crypto';

  displayCryptoExp = 'flex';

  displayNftExp = 'none';

  heightCryptoExp = window.innerWidth < 700 ? '80%' : '40%';

  widthCryptoExp = window.innerWidth < 700 ? '100%' : '70%';

  cryptoFlexDirectionExp = window.innerWidth < 700 ? 'column' : 'row';

  cryptoScrollYExp = window.innerWidth < 700 ? 'scroll' : 'hidden';

  cryptoScrollXExp = window.innerWidth < 700 ? 'hidden' : 'scroll';

  // ! This is used for toggling between
  //! crypto and NFTs in small screens
  toggleContainerContent() {
    if (this.displayCryptoExp === 'flex') {
      this.displayCryptoExp = 'none';
    } else {
      this.displayCryptoExp = 'flex';
      this.selectedContent = 'Crypto';
    }
    if (this.displayNftExp === 'none') {
      this.displayNftExp = 'flex';
      this.selectedContent = 'NFTs';
    } else {
      this.displayNftExp = 'none';
    }
    this.content_toggler = !this.content_toggler;
  }
}
