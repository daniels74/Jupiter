import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CoinGeckoApiService } from '../Core/Services/coin-gecko-api.service';
import { Store } from '@ngrx/store';
import { cryptoCoinGeckoApiActions } from '../Shared/State/Actions/coingecko.actions';
import { nftCoinGeckoApiActions } from '../Shared/State/Actions/nftList.actions';
import { AuthService } from '../Core/Services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    private coinGeckoService: CoinGeckoApiService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.authService.authState$.subscribe((state) => {
      console.log('Auth State', state);
    });

    //  Check if user has token
    this.authService.liveSessionCheck();

    // Fetch all Crypto // ! Using BehaviorSubject
    this.coinGeckoService.getAllCrypto().subscribe((allcrypto) => {
      this.coinGeckoService.allCrypto_BS.next(allcrypto);
    });

    // Fetching & Setting trending CRYPTO
    this.coinGeckoService.getTrendingCrypto().subscribe((cryptos) => {
      this.store.dispatch(
        cryptoCoinGeckoApiActions.setCryptoListState({ cryptos }),
      );
    });

    // Fetching & Setting trending NFTS
    this.coinGeckoService.getTrendingNFT().subscribe((nfts) => {
      this.store.dispatch(
        nftCoinGeckoApiActions.setTrendingNFTSState({ nfts }),
      );
    });
  }

  switchMode(isDarkMode: any) {
    const hostClass = isDarkMode.checked
      ? 'mat-app-background theme-dark'
      : 'mat-app-background theme-light';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }
}
