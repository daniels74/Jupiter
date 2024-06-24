import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BaseUrl } from '../../Root/app.module';
import { WINDOW } from '../../window-token';
import { Surfer } from '../Interfaces/surfer.interface';
import { NFTId, SingleNFT } from '../Interfaces/singleNFT';
import { CoinGeckoApiService } from './coin-gecko-api.service';
import { SingleCoin } from '../Interfaces/singleCoin.interface';
import { BasicCrypto } from '../Interfaces/CoinGecko/BasicCrypto.interface';
import { CryptoId } from '../Interfaces/top-trending';

@Injectable({
  providedIn: 'root',
})
export class SurferService {
  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  surferBehaviorSubject = new BehaviorSubject<Surfer>(<Surfer>{});
  surfer$ = this.surferBehaviorSubject.asObservable();

  surferCryptoBehaviorSubject = new BehaviorSubject<SingleCoin[]>(
    <SingleCoin[]>[],
  );
  surferCryptos$ = this.surferCryptoBehaviorSubject.asObservable();

  surferNFTSBehaviorSubject = new BehaviorSubject<SingleNFT[]>(<SingleNFT[]>[]);
  surferNFTS$ = this.surferNFTSBehaviorSubject.asObservable();

  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    // private route: ActivatedRoute,
    private http: HttpClient,
    private CoinGeckoAPI: CoinGeckoApiService,
  ) {}

  getAndSetSurferData(id: any): Observable<any> {
    // const id = this.route.snapshot.paramMap.get('id');
    return this.http.get<Surfer>(this.origin + '/api/user/surfer/' + id).pipe(
      map((surfer) => {
        this.surferBehaviorSubject.next(surfer);
        console.log('SET SURFER OBSERVABLE:  ', this.origin);
        // if (surfer.cryptos) {
        //   this.getAndSetSurferCrypto(surfer.cryptos);
        // }
        if (surfer.nfts) {
          this.getAndSetSurferNfts(surfer.nfts);
        }
        return surfer;
      }),
    );
  }

  getAndSetSurferCrypto(coinIds: CryptoId[]) {
    const c: SingleCoin[] = [];
    coinIds.forEach((ele) => {
      if (ele.cryptoid) {
        this.CoinGeckoAPI.getSingleCoin(ele.cryptoid).subscribe((res) => {
          if (res) {
            c.push(res);
          }
        });
      }
    });
    this.surferCryptoBehaviorSubject.next(c);
  }

  getAndSetSurferNfts(nftIds: NFTId[]) {
    const f: SingleNFT[] = [];
    nftIds.forEach((ele) => {
      if (ele.nftid) {
        this.CoinGeckoAPI.getSingleNFT(ele.nftid).subscribe((res) => {
          f.push(res);
        });
      }
    });
    this.surferNFTSBehaviorSubject.next(f);
  }
}
