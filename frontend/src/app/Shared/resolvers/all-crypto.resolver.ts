import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoinGeckoApiService } from '../../Core/Services/coin-gecko-api.service';
import { BasicCrypto } from '../../Core/Interfaces/CoinGecko/BasicCrypto.interface';

@Injectable({
  providedIn: 'root',
})
export class Nft_Collection_Retrieval {
  constructor(private coinGeckoService: CoinGeckoApiService) {}
  all!: BasicCrypto[];
  getAllCrypto(): BasicCrypto[] {
    this.coinGeckoService.getAllCrypto().subscribe((res) => {
      this.all = res;
    });
    console.log('ALL CRYPTO RESOLVER: ', this.all);
    return this.all;
  }
}

export const allCryptoResolver: ResolveFn<BasicCrypto[]> = (route, state) => {
  return inject(Nft_Collection_Retrieval).getAllCrypto();
};
