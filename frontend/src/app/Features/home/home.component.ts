import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoinsEntity, NftsEntity } from '../../Core/Interfaces/top-trending';
import {
  selectCrypto,
  selectNfts,
} from '../../Shared/State/Selectors/crypto.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private store: Store) {}

  crypto$: Observable<Array<CoinsEntity>> = this.store.select(selectCrypto);

  nfts$: Observable<Array<NftsEntity>> = this.store.select(selectNfts);

  displayCryptoExp = window.innerWidth < 700 ? 'flex' : 'flex';

  displayNftExp = window.innerWidth < 700 ? 'none' : 'flex';

  heightCryptoExp = window.innerWidth < 700 ? '90%' : '40%';

  widthCryptoExp = window.innerWidth < 700 ? '90%' : '70%';

  cryptoFlexDirectionExp = window.innerWidth < 700 ? 'column' : 'row';

  cryptoScrollYExp = window.innerWidth < 700 ? 'scroll' : 'hidden';

  cryptoScrollXExp = window.innerWidth < 700 ? 'hidden' : 'scroll';

  cryptoJustifyContent = window.innerWidth < 700 ? 'flex-start' : 'flex-start';
}
