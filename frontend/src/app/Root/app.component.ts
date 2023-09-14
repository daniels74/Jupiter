import { Component, OnInit } from '@angular/core';
import { CoinGeckoApiService } from '../Core/Services/coin-gecko-api.service';
import { Store } from '@ngrx/store';
import { coinGeckoApiActions } from '../Shared/State/Actions/cryptoList.actions';
import { nftCoinGeckoApiActions } from '../Shared/State/Actions/nftList.actions';
import { AuthService } from '../Core/Services/auth.service';
import { selectAuth } from '../Shared/State/Selectors/auth.selector';

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
    this.authService.liveSessionCheck();

    const currentAuthState = this.store.select(selectAuth);
    currentAuthState.subscribe((state) => {
      console.log('Root auth State from ngrx: ', state);
    });

    this.coinGeckoService.getTrendingCrypto().subscribe((cryptos) => {
      console.log('Top tredning', cryptos);
      this.store.dispatch(coinGeckoApiActions.retrieveCryptoList({ cryptos }));
    });

    this.coinGeckoService.getTrendingNFT().subscribe((nfts) => {
      this.store.dispatch(nftCoinGeckoApiActions.retrieveNFTS({ nfts }));
    });
  }
}
