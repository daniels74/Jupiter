import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WINDOW } from '../../../window-token';
import { User } from '../../Interfaces/User.interface';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  forkJoin,
  from,
  interval,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { selectUser } from '../../../Shared/State/Selectors/users.selector';
import { CryptoId } from '../../Interfaces/top-trending';
import { CoinGeckoApiService } from '../coin-gecko-api.service';
import { BaseUrl } from '../../../Root/app.module';
import { userCryptoCollectionAction } from '../../../Shared/State/Actions/userCryptoCollection.actions';
import { SingleCoin } from '../../Interfaces/singleCoin.interface';
import { selectUserCryptoCollection } from '../../../Shared/State/Selectors/userCryptoCollection.selector';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CryptoService implements OnInit {
  user!: User;
  userSub!: Subscription;
  origin = this.local_origin ? this.local_origin : this.window.location.origin;
  // cryptoSingleCoinList: any[] = [];

  // cryptoCollection_BS = new BehaviorSubject<any[]>([]);
  // cryptoCollection_O = this.cryptoCollection_BS.asObservable();
  cryptoCollection_BS = new BehaviorSubject<any[]>([]);
  cryptoCollection_O = this.cryptoCollection_BS.asObservable();

  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    private http: HttpClient,
    private store: Store,
    private CoinGecko: CoinGeckoApiService,
  ) {}
  ngOnInit(): void {
    this.userSub = this.store.select(selectUser).subscribe((currentUser) => {
      this.user = currentUser;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  // postCryptoId(cryptoStringId: string): Observable<any> {
  //   return this.http
  //     .post(this.origin + '/cryptoid', {
  //       cryptoid: cryptoStringId,
  //     })
  //     .pipe(
  //       map((res) => {
  //         this.CoinGecko.getSingleCoin(cryptoStringId).subscribe((res) => {
  //           //// Add the string ID to the coin object
  //           const cryptoCoin = {
  //             ...res,
  //           };
  //           const collection = this.cryptoCollection_BS.value;
  //           collection.push(cryptoCoin);
  //           this.cryptoCollection_BS.next(collection);
  //         });
  //         return res;
  //       }),
  //     );
  // }
  // postCryptoId(cryptoStringId: string): Observable<any> {
  //   return this.http
  //     .post(this.origin + '/cryptoid', { cryptoid: cryptoStringId })
  //     .pipe(
  //       switchMap(() =>
  //         this.CoinGecko.getSingleCoin(cryptoStringId).pipe(
  //           tap((coin) => {
  //             // ✅ Push full coin object into store
  //             this.store.dispatch(
  //               userCryptoCollectionAction.addCrypto({ newCoin: coin }),
  //             );
  //           }),
  //         ),
  //       ),
  //     );
  // }
  postCryptoId(cryptoStringId: string): Observable<any> {
    const url = `${this.origin}/cryptoid`;
    const body = { cryptoid: cryptoStringId }; // must match DTO

    return this.http.post(url, body).pipe(
      switchMap(() =>
        this.CoinGecko.getSingleCoin(cryptoStringId).pipe(
          tap((coin) => {
            this.store.dispatch(
              userCryptoCollectionAction.addCrypto({ newCoin: coin }),
            );
          }),
        ),
      ),
    );
  }

  getUserCryptoIds(userId: number): Observable<any> {
    return this.http.get(this.origin + '/cryptoid', {
      params: {
        userId: userId,
      },
    });
  }

  deleteCryptoId(disposeCrypto: string): Observable<any> {
    // ! Delete id from DataBase
    return this.http
      .delete(this.origin + '/cryptoid/entrydelete/cryptoid/' + disposeCrypto)
      .pipe(
        map((res) => {
          // ! Delete item from list of FULL cryptos
          const fullCryptoList = this.cryptoCollection_BS.value.filter(
            (crypto) => crypto.id != disposeCrypto,
          );
          this.cryptoCollection_BS.next(fullCryptoList);
          console.log('Observable - Updated full crypto list', fullCryptoList);

          // ! Delete Id from Ngrx store.
          this.store.dispatch(
            userCryptoCollectionAction.removeCryptoId({
              idToRemove: disposeCrypto,
            }),
          );
          this.store
            .select(selectUserCryptoCollection)
            .pipe(take(1))
            .subscribe((cryptoIds) => {
              console.log('NGRX - Updated crypto lists', cryptoIds);
            });
          return res;
        }),
      );
  }

  deleteCryptoEntryById(id: number): Observable<any> {
    return this.http.delete(this.origin + '/cryptoid/entrydelete/' + id);
  }

  // // Use string IDs to lookup each coin, push to array, and
  // // set the observable with that array
  // setCryptoSingleCoins() {
  //   this.store
  //     .select(selectUserCryptoCollection)
  //     .pipe(
  //       switchMap((allCryptoIds) => {
  //         console.log('DO we have crypto IDS? ', allCryptoIds);
  //         const requests = allCryptoIds.map((ele: { cryptoid: string }) =>
  //           this.CoinGecko.getSingleCoin(ele.cryptoid),
  //         );
  //         return forkJoin(requests);
  //       }),
  //     )
  //     .subscribe((results: any) => {
  //       console.log(results);
  //       this.cryptoCollection_BS.next(results);
  //     });
  //   return;
  // }
  //! setCryptoSingleCoins(cryptoIds: { cryptoid: string }[]) {
  //   if (!cryptoIds || cryptoIds.length === 0) {
  //     // nothing to fetch, just clear the store
  //     this.store.dispatch(
  //       userCryptoCollectionAction.setUserCryptoCollection({
  //         cryptoCollection_ngrx: [],
  //       }),
  //     );
  //     return;
  //   }

  //   // build requests for all IDs
  //   const requests = cryptoIds.map(
  //     (ele) => this.CoinGecko.getSingleCoin(ele.cryptoid), // Observable<SingleCoin>
  //   );

  //   forkJoin(requests).subscribe((results) => {
  //     this.store.dispatch(
  //       userCryptoCollectionAction.setUserCryptoCollection({
  //         cryptoCollection_ngrx: results, // full coin objects
  //       }),
  //     );
  //   });
  // }
  // !
  // private singleCoinTTL = 20 * 60 * 1000; // 10 minutes

  // setCryptoSingleCoins(cryptoIds: { cryptoid: string }[]) {
  //   if (!cryptoIds || cryptoIds.length === 0) {
  //     this.store.dispatch(
  //       userCryptoCollectionAction.setUserCryptoCollection({
  //         cryptoCollection_ngrx: [],
  //       }),
  //     );
  //     return;
  //   }

  //   const freshRequests: { id: string; obs: Observable<any> }[] = [];
  //   const cachedResults: any[] = [];

  //   cryptoIds.forEach(({ cryptoid }) => {
  //     const cacheKey = `coin_${cryptoid}`;
  //     const cacheTimeKey = `${cacheKey}_time`;

  //     const cached = localStorage.getItem(cacheKey);
  //     const cachedTime = Number(localStorage.getItem(cacheTimeKey) || 0);

  //     if (cached && Date.now() - cachedTime < this.singleCoinTTL) {
  //       // ✅ use cache
  //       cachedResults.push(JSON.parse(cached));
  //     } else {
  //       // ❌ needs fresh request
  //       freshRequests.push({
  //         id: cryptoid,
  //         obs: this.CoinGecko.getSingleCoin(cryptoid),
  //       });
  //     }
  //   });

  //   if (freshRequests.length > 0) {
  //     forkJoin(freshRequests.map((r) => r.obs)).subscribe((freshResults) => {
  //       // store fresh results in localStorage
  //       freshResults.forEach((result, index) => {
  //         const cryptoid = freshRequests[index].id;
  //         const cacheKey = `coin_${cryptoid}`;
  //         const cacheTimeKey = `${cacheKey}_time`;

  //         localStorage.setItem(cacheKey, JSON.stringify(result));
  //         localStorage.setItem(cacheTimeKey, Date.now().toString());
  //       });

  //       // ✅ merge cached + fresh and dispatch
  //       const allResults = [...cachedResults, ...freshResults];
  //       this.store.dispatch(
  //         userCryptoCollectionAction.setUserCryptoCollection({
  //           cryptoCollection_ngrx: allResults,
  //         }),
  //       );
  //     });
  //   } else {
  //     // only cached results exist
  //     this.store.dispatch(
  //       userCryptoCollectionAction.setUserCryptoCollection({
  //         cryptoCollection_ngrx: cachedResults,
  //       }),
  //     );
  //   }
  // }

  private singleCoinTTL = 10 * 60 * 1000; // 10 minutes
  private retryIntervalMs = 30_000; // retry every 30 seconds
  private retryQueue: Set<string> = new Set();

  setCryptoSingleCoins(cryptoIds: { cryptoid: string }[]) {
    // ? If not ids, clear store and return
    if (!cryptoIds || cryptoIds.length === 0) {
      this.store.dispatch(
        userCryptoCollectionAction.setUserCryptoCollection({
          cryptoCollection_ngrx: [],
        }),
      );
      return;
    }

    const freshRequests: { id: string; obs: Observable<any> }[] = [];
    const cachedResults: any[] = [];

    cryptoIds.forEach(({ cryptoid }) => {
      const cacheKey = `coin_${cryptoid}`;
      const cacheTimeKey = `${cacheKey}_time`;

      const cached = localStorage.getItem(cacheKey);
      const cachedTime = Number(localStorage.getItem(cacheTimeKey) || 0);

      // ? If coin is found in cache and still valid, use it
      if (cached && Date.now() - cachedTime < this.singleCoinTTL) {
        cachedResults.push(JSON.parse(cached));
      } else {
        // ? Needs fresh request
        freshRequests.push({
          id: cryptoid,
          obs: this.CoinGecko.getSingleCoin(cryptoid).pipe(
            catchError((err) => {
              console.warn(
                `Failed to fetch ${cryptoid}, will retry later`,
                err,
              );
              this.retryQueue.add(cryptoid);
              return of(null); // prevent breaking forkJoin
            }),
          ),
        });
      }
    });

    if (freshRequests.length > 0) {
      forkJoin(freshRequests.map((r) => r.obs)).subscribe((freshResults) => {
        const successfulResults: any[] = [];

        freshResults.forEach((result, index) => {
          if (result) {
            const cryptoid = freshRequests[index].id;
            const cacheKey = `coin_${cryptoid}`;
            const cacheTimeKey = `${cacheKey}_time`;

            localStorage.setItem(cacheKey, JSON.stringify(result));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
            successfulResults.push(result);

            // ✅ remove from retry queue
            this.retryQueue.delete(cryptoid);
          }
        });

        // Merge cached + fresh + successful results
        this.store
          .select(selectUserCryptoCollection)
          .pipe(take(1))
          .subscribe((currentState) => {
            const mergedResults = this.mergeCoins(currentState, [
              ...cachedResults,
              ...successfulResults,
            ]);

            this.store.dispatch(
              userCryptoCollectionAction.setUserCryptoCollection({
                cryptoCollection_ngrx: mergedResults,
              }),
            );
          });

        // const allResults = [...cachedResults, ...successfulResults];
        // this.store.dispatch(
        //   userCryptoCollectionAction.setUserCryptoCollection({
        //     cryptoCollection_ngrx: allResults,
        //   }),
        // );
      });
    } else {
      this.store.dispatch(
        userCryptoCollectionAction.setUserCryptoCollection({
          cryptoCollection_ngrx: cachedResults,
        }),
      );
    }
  }

  private mergeCoins(existing: any[], incoming: any[]): any[] {
    const map = new Map<string, any>();

    // keep existing first
    existing.forEach((coin) => map.set(coin.id, coin));

    // overwrite with incoming (fresh wins)
    incoming.forEach((coin) => {
      if (coin) {
        map.set(coin.id, coin);
      }
    });

    return Array.from(map.values());
  }

  // 🔄 Retry mechanism: call this once (e.g., in constructor or app init)
  startRetryLoop() {
    interval(this.retryIntervalMs).subscribe(() => {
      console.log('Retrying failed cryptos:', Array.from(this.retryQueue));
      if (this.retryQueue.size > 0) {
        const toRetry = Array.from(this.retryQueue).map((id) => ({
          cryptoid: id,
        }));
        this.setCryptoSingleCoins(toRetry);
      }
    });
  }

  moveNullsToEnd(anArray: SingleCoin[]) {
    const newArr = anArray;
    anArray.forEach((e, index, []) => {
      if (e === null) {
        newArr.push(newArr.splice(index, 1)[0]);
      }
    });
    return newArr;
  }
}
