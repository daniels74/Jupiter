import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoCoinObj, NFT, TopTrending } from '../Interfaces/top-trending';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  retry,
  throwError,
} from 'rxjs';
import { SingleCoin } from '../Interfaces/singleCoin.interface';
import { SingleNFT } from '../Interfaces/singleNFT';
import { CryptoService } from './UserCollection/crypto.service';
import { BasicCrypto } from '../Interfaces/CoinGecko/BasicCrypto.interface';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoApiService {
  marketChartData_BS = new BehaviorSubject<any[]>([]);
  marketChartData_O = this.marketChartData_BS.asObservable();

  allCrypto_BS = new BehaviorSubject<BasicCrypto[]>([]);
  allCrypto_O = this.allCrypto_BS.asObservable();

  constructor(private http: HttpClient) {}

  getAllCrypto(): Observable<BasicCrypto[]> {
    return this.http.get<BasicCrypto[]>(
      'https://api.coingecko.com/api/v3/coins/list?include_platform=false',
    );
  }

  getTrendingCrypto(): Observable<Array<CryptoCoinObj>> {
    return this.http
      .get<{ coins: CryptoCoinObj[] }>(
        'https://api.coingecko.com/api/v3/search/trending',
      )
      .pipe(map((cry) => cry.coins || []));
  }

  getTrendingNFT(): Observable<Array<NFT>> {
    return this.http
      .get<{ nfts: NFT[] }>('https://api.coingecko.com/api/v3/search/trending')
      .pipe(map((nft) => nft.nfts || []));
  }

  getSingleCoin(coinId: string): Observable<SingleCoin> {
    return this.http.get<SingleCoin>(
      'https://api.coingecko.com/api/v3/coins/' +
        coinId +
        '?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
    );
  }

  getSingleNFT(nftId: string): Observable<SingleNFT> {
    return this.http.get<SingleNFT>(
      'https://api.coingecko.com/api/v3/nfts/' + nftId,
    );
  }

  getChartData(id: string): Observable<any> {
    return this.http
      .get(
        'https://api.coingecko.com/api/v3/coins/' +
          id +
          '/market_chart?vs_currency=usd&days=7',
      )
      .pipe(
        map((res: any) => {
          if (!res.prices) {
            this.marketChartData_BS.next([1]);
          } else {
            this.marketChartData_BS.next(res.prices);
          }
          return res;
        }),
      );
    // .pipe(
    //   catchError((err) => {
    //     this.marketChartData_BS.next([1]);
    //     return this.catchTheError(err);
    //   }),
    // );
  }

  catchTheError(error: any): Observable<any> {
    console.log('ERROR: ', error);
    return throwError(error);
  }
}
