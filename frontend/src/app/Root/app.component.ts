import { Component, OnInit } from '@angular/core';
import { CoinGeckoApiService } from '../Core/Services/coin-gecko-api.service';
import { Store } from '@ngrx/store';
import { cryptoCoinGeckoApiActions } from '../Shared/State/Actions/coingecko.actions';
import { nftCoinGeckoApiActions } from '../Shared/State/Actions/nftList.actions';
import { AuthService } from '../Core/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private authService: AuthService,
    private coinGeckoService: CoinGeckoApiService,
    private store: Store,
  ) {}

  ngOnInit() {
    //  Check if user has token
    this.authService.liveSessionCheck();

    // Fetching|Setting trending CRYPTO
    this.coinGeckoService.getTrendingCrypto().subscribe((cryptos) => {
      console.log('Top tredning', cryptos);
      this.store.dispatch(
        cryptoCoinGeckoApiActions.setCryptoListState({ cryptos }),
      );
    });
    // Fetching|Setting trending NFTS
    this.coinGeckoService.getTrendingNFT().subscribe((nfts) => {
      this.store.dispatch(
        nftCoinGeckoApiActions.setTrendingNFTSState({ nfts }),
      );
    });
  }
}
