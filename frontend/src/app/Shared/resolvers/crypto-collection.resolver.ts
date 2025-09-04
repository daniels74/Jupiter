import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CryptoService } from '../../Core/Services/UserCollection/crypto.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../State/Selectors/users.selector';

@Injectable({
  providedIn: 'root',
})
export class crypto_Collection_Retrieval {
  constructor(private cryptoService: CryptoService, private store: Store) {}

  getFullCryptoListFromIds() {
    this.store.select(selectUser).subscribe((currentUser) => {
      const { cryptos, ...shortUser } = currentUser;
      this.cryptoService.setCryptoSingleCoins(cryptos);
    });
    return;
  }
}

export const cryptoCollectionResolver: ResolveFn<void> = (route, state) => {
  return inject(crypto_Collection_Retrieval).getFullCryptoListFromIds();
};
