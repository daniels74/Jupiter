import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CryptoService } from '../../Core/Services/UserCollection/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class crypto_Collection_Retrieval {
  constructor(private cryptoService: CryptoService) {}

  getFullCryptoListFromIds() {
    let s!: any;
    this.cryptoService.setCryptoSingleCoins().subscribe((res) => {
      s = res;
      console.log('Crypto Resolver ! ', res);
    });
    return s;
  }
}

export const cryptoCollectionResolver: ResolveFn<boolean> = (route, state) => {
  return inject(crypto_Collection_Retrieval).getFullCryptoListFromIds();
};
