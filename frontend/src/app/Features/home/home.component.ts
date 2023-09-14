import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoinsEntity, NftsEntity } from '../../Core/Interfaces/top-trending';
import { selectCrypto, selectNfts } from '../../Shared/State/Selectors/crypto.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private store: Store) {}

  crypto$: Observable<Array<CoinsEntity>> = this.store.select(selectCrypto);

  nfts$: Observable<Array<NftsEntity>> = this.store.select(selectNfts);
}
