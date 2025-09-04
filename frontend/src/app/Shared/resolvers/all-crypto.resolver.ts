import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoinGeckoApiService } from '../../Core/Services/coin-gecko-api.service';
import { BasicCrypto } from '../../Core/Interfaces/CoinGecko/BasicCrypto.interface';

@Injectable({
  providedIn: 'root',
})
export class Nft_Collection_Retrieval {
  constructor(private coinGeckoService: CoinGeckoApiService) {}
  getAllCrypto(): void {
    this.coinGeckoService.getAllCrypto();
    return;
  }
}

export const allCryptoResolver: ResolveFn<void> = (route, state) => {
  return inject(Nft_Collection_Retrieval).getAllCrypto();
};
