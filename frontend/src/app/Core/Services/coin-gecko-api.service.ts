import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoCoinObj, NFT, TopTrending } from '../Interfaces/top-trending';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { SingleCoin } from '../Interfaces/singleCoin.interface';
import { SingleNFT } from '../Interfaces/singleNFT';
import { BasicCrypto } from '../Interfaces/CoinGecko/BasicCrypto.interface';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoApiService {
  marketChartData_BS = new BehaviorSubject<any[]>([]);
  marketChartData_O = this.marketChartData_BS.asObservable();

  allCrypto_BS = new BehaviorSubject<BasicCrypto[]>([]);
  allCrypto_O = this.allCrypto_BS.asObservable();

  cached = localStorage.getItem('cryptoData');
  lastFetch = Number(localStorage.getItem('cryptoDataTime') || 0);
  private ttl = 20 * 60 * 1000; // 20 minutes in ms

  constructor(private http: HttpClient) {}

  getAllCrypto(): Observable<BasicCrypto[]> {
    if (this.cached && Date.now() - this.lastFetch < this.ttl) {
      console.log(
        'Serving coingecko crypto data from cache: ',
        JSON.parse(this.cached),
      );
      const cachedData = JSON.parse(this.cached);
      this.allCrypto_BS.next(cachedData);
      return of(cachedData); // ✅ serve cached
    } else {
      console.log('Serving coingecko crypto data from API');
      return this.http
        .get<BasicCrypto[]>(
          'https://api.coingecko.com/api/v3/coins/list?include_platform=false',
        )
        .pipe(
          tap((data: BasicCrypto[]) => {
            localStorage.setItem('cryptoData', JSON.stringify(data));
            localStorage.setItem('cryptoDataTime', Date.now().toString());
            this.cached = JSON.stringify(data); // keep memory in sync
            this.lastFetch = Date.now();
            this.allCrypto_BS.next(data);
            console.log('Fetched coingecko crypto data: ', data);
          }),
        );
    }
  }

  // getTrendingCrypto(): Observable<Array<CryptoCoinObj>> {
  //   return this.http
  //     .get<{ coins: CryptoCoinObj[] }>(
  //       'https://api.coingecko.com/api/v3/search/trending',
  //     )
  //     .pipe(map((cry) => cry.coins || []));
  // }
  private trendingCacheKey = 'trendingCrypto';
  private trendingCacheTimeKey = 'trendingCryptoTime';
  private trendingTTL = 20 * 60 * 1000; // 10 minutes

  getTrendingCrypto(): Observable<Array<CryptoCoinObj>> {
    const cached = localStorage.getItem(this.trendingCacheKey);
    const cachedTime = Number(
      localStorage.getItem(this.trendingCacheTimeKey) || 0,
    );

    if (cached && Date.now() - cachedTime < this.trendingTTL) {
      console.log('Serving trending crypto from cache');
      return of(JSON.parse(cached));
    } else {
      console.log('Fetching trending crypto from API');
      return this.http
        .get<{ coins: CryptoCoinObj[] }>(
          'https://api.coingecko.com/api/v3/search/trending',
        )
        .pipe(
          map((res) => res.coins || []),
          tap((data) => {
            localStorage.setItem(this.trendingCacheKey, JSON.stringify(data));
            localStorage.setItem(
              this.trendingCacheTimeKey,
              Date.now().toString(),
            );
          }),
        );
    }
  }

  // getTrendingNFT(): Observable<Array<NFT>> {
  //   return this.http
  //     .get<{ nfts: NFT[] }>('https://api.coingecko.com/api/v3/search/trending')
  //     .pipe(map((nft) => nft.nfts || []));
  // }
  private trendingNFTCacheKey = 'trendingNFTs';
  private trendingNFTCacheTimeKey = 'trendingNFTsTime';
  private trendingNFTTTL = 20 * 60 * 1000; // 10 minutes

  getTrendingNFT(): Observable<NFT[]> {
    const cached = localStorage.getItem(this.trendingNFTCacheKey);
    const cachedTime = Number(
      localStorage.getItem(this.trendingNFTCacheTimeKey) || 0,
    );

    if (cached && Date.now() - cachedTime < this.trendingNFTTTL) {
      console.log('Serving trending NFTs from cache');
      return of(JSON.parse(cached));
    } else {
      console.log('Fetching trending NFTs from API');
      return this.http
        .get<{ nfts: NFT[] }>('https://api.coingecko.com/api/v3/nfts/list')
        .pipe(
          map((res) => res.nfts || []),
          tap((data) => {
            localStorage.setItem(
              this.trendingNFTCacheKey,
              JSON.stringify(data),
            );
            localStorage.setItem(
              this.trendingNFTCacheTimeKey,
              Date.now().toString(),
            );
          }),
        );
    }
  }

  getSingleCoin(coinId: string): Observable<SingleCoin | any> {
    return this.http.get<any>(
      'https://api.coingecko.com/api/v3/coins/' +
        coinId +
        '?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
    );
    // .pipe(
    //   catchError((error) => {
    //     console.error(`Error fetching coin ${coinId}:`, error);
    //     return of({ id: coinId }); // mark failed coin
    //   }),
    // );
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

  getImage(url: string): Observable<any> {
    return this.http.post('https://localhost:3000/cryptoid/cryptoimg', {
      url: url,
    });
  }
}
