import { Component, OnInit } from '@angular/core';
import { CoinGeckoApiService } from '../Core/Services/coin-gecko-api.service';
import { Store } from '@ngrx/store';
import { cryptoCoinGeckoApiActions } from '../Shared/State/Actions/coingecko.actions';
import { nftCoinGeckoApiActions } from '../Shared/State/Actions/nftList.actions';
import { AuthService } from '../Core/Services/auth.service';
// import { DOCUMENT } from '@angular/common';
import { SiteAdjustmentService } from '../Core/Services/UX/site-adjustment.service';
import { CryptoService } from '../Core/Services/UserCollection/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = [];

  constructor(
    // @Inject(DOCUMENT) private document: Document,
    // private renderer: Renderer2,
    private authService: AuthService,
    private coinGeckoService: CoinGeckoApiService,
    private store: Store,
    private themeService: SiteAdjustmentService,
    private cryptoService: CryptoService,
  ) {
    // RETRY LOOP FOR CRYPTO COLLECTION
    this.cryptoService.startRetryLoop();
  }

  ngOnInit() {
    this.themeService.initTheme();

    //  Check if user has token
    this.authService.liveSessionCheck();

    // Fetch all Crypto // ! Using BehaviorSubject
    this.coinGeckoService.getAllCrypto().subscribe((cryptos: any) => {
      console.log('All Crypto from AppComponent: ', cryptos);
    });

    // Fetching & Setting trending CRYPTO
    this.coinGeckoService.getTrendingCrypto().subscribe((cryptos) => {
      this.store.dispatch(
        cryptoCoinGeckoApiActions.setCryptoListState({ cryptos }),
      );
    });

    // ! Fetching & Setting trending NFTS (No longer available for free on coingecko)
    this.coinGeckoService.getTrendingNFT().subscribe((nfts) => {
      console.log('Trending NFTs from AppComponent: ', nfts);
      this.store.dispatch(
        nftCoinGeckoApiActions.setTrendingNFTSState({ nfts }),
      );
    });
  }

  // switchMode(isDarkMode: any) {
  //   const hostClass = isDarkMode.checked
  //     ? 'mat-app-background theme-dark'
  //     : 'mat-app-background theme-light';
  //   this.renderer.setAttribute(this.document.body, 'class', hostClass);
  // }
}
