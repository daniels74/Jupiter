import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CryptoCoinObj, NFT } from '../../Core/Interfaces/top-trending';
import {
  selectCrypto,
  selectNfts,
} from '../../Shared/State/Selectors/crypto.selectors';
import { UserNftCollectionService } from '../../Core/Services/UserCollection/user-nft-collection.service';
import { CoinGeckoApiService } from '../../Core/Services/coin-gecko-api.service';
import { BasicCrypto } from '../../Core/Interfaces/CoinGecko/BasicCrypto.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  allCrypto!: BasicCrypto[];
  displayedColumns: string[] = ['id', 'name', 'symbol'];
  dataSource!: MatTableDataSource<BasicCrypto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store,
    private nftService: UserNftCollectionService,
    private CoinGeckoService: CoinGeckoApiService,
  ) {
    this.dataSource = new MatTableDataSource<BasicCrypto>(this.allCrypto);
    this.CoinGeckoService.allCrypto_O.subscribe((allcrypto) => {
      this.allCrypto = allcrypto;
      this.dataSource.data = this.allCrypto;
    });
  }

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  crypto$: Observable<Array<CryptoCoinObj>> = this.store.select(selectCrypto);

  nfts$: Observable<Array<NFT>> = this.store.select(selectNfts);

  isBigScreen = window.innerWidth > 700 ? 'flex' : 'none';
  isSmallScreen = window.innerWidth < 700 ? 'flex' : 'none';
  sizeState = window.innerWidth < 700 ? false : true;

  //displayNFTS = window.innerWidth > 700 ? true : false;
  content_toggler = false;

  trendingContent_state = false;

  selectedContent = 'Crypto';

  displayCryptoExp = 'flex';

  displayNftExp = 'none';

  allCryptoState = true;

  heightCryptoExp = window.innerWidth < 700 ? '20%' : '100%';

  widthCryptoExp = window.innerWidth < 700 ? '100%' : '80%';

  cryptoFlexDirectionExp = window.innerWidth < 700 ? 'row' : 'row';

  cryptoScrollYExp = window.innerWidth < 700 ? 'hidden' : 'hidden';

  cryptoScrollXExp = window.innerWidth < 700 ? 'scroll' : 'scroll';

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

  toggleAllCrypto() {
    this.allCryptoState = !this.allCryptoState;
  }

  toggleContentState() {
    this.trendingContent_state = !this.trendingContent_state;
  }
}
