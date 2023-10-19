import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WINDOW } from '../../../window-token';
import { User } from '../../Interfaces/User.interface';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  from,
  map,
  of,
  take,
} from 'rxjs';
import { selectUser } from '../../../Shared/State/Selectors/users.selector';
import { CryptoId } from '../../Interfaces/top-trending';
import { CoinGeckoApiService } from '../coin-gecko-api.service';
import { BaseUrl } from '../../../Root/app.module';
import { userCryptoCollectionAction } from '../../../Shared/State/Actions/userCryptoCollection.actions';
import { SingleCoin } from '../../Interfaces/singleCoin.interface';
import { selectUserCryptoCollection } from '../../../Shared/State/Selectors/userCryptoCollection.selector';

@Injectable({
  providedIn: 'root',
})
export class CryptoService implements OnInit {
  user!: User;
  userSub!: Subscription;
  origin = this.local_origin ? this.local_origin : this.window.location.origin;
  // cryptoSingleCoinList: any[] = [];
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

  postCryptoId(cryptoStringId: string): Observable<any> {
    return this.http
      .post(this.origin + '/cryptoid', {
        cryptoid: cryptoStringId,
      })
      .pipe(
        map((res) => {
          this.CoinGecko.getSingleCoin(cryptoStringId).subscribe((res) => {
            //// Add the string ID to the coin object
            const cryptoCoin = {
              ...res,
            };
            const collection = this.cryptoCollection_BS.value;
            collection.push(cryptoCoin);
            this.cryptoCollection_BS.next(collection);
          });
          return res;
        }),
      );
  }

  getAllCryptoIds(user: User): Observable<any> {
    return this.http.get(this.origin + '/cryptoid', {
      params: {
        userId: user.id,
      },
    });
  }

  deleteCryptoId(disposeCrypto: string): Observable<any> {
    return this.http
      .delete(this.origin + '/cryptoid/entrydelete/cryptoid/' + disposeCrypto)
      .pipe(
        map((res) => {
          // delete item from list of full cryptos
          const newCollection = this.cryptoCollection_BS.value.filter(
            (crypto) => crypto.id != disposeCrypto,
          );
          this.cryptoCollection_BS.next(newCollection);
          // delete item from id list
          // this.store
          //   .select(selectUserCryptoCollection)
          //   .subscribe((cryptoIds) => {
          //     const cryptoCollection_ngrx = cryptoIds.filter(
          //       (crypto) => crypto.cryptoid != disposeCrypto,
          //     );
          //     this.store.dispatch(
          //       userCryptoCollectionAction.setUserCryptoCollection({
          //         cryptoCollection_ngrx,
          //       }),
          //     );
          //   });
          return res;
        }),
      );
  }

  deleteCryptoEntryById(id: number): Observable<any> {
    return this.http.delete(this.origin + '/cryptoid/entrydelete/' + id);
  }

  // // Use string IDs to lookup each coin, push to array, and
  // // set the observable with that array
  setCryptoSingleCoins(): Observable<boolean> {
    const cryptoCollection_ngrx: Array<any> = [];
    this.store.select(selectUserCryptoCollection).subscribe((allCryptoIds) => {
      allCryptoIds.forEach((ele: CryptoId) => {
        if (ele.cryptoid) {
          this.CoinGecko.getSingleCoin(ele.cryptoid).subscribe((res) => {
            //// Add the string ID to the coin object
            const cryptoCoin = {
              ...res,
              //collectionId: ele.id,
            };
            cryptoCollection_ngrx.push(cryptoCoin);
          });
        } else {
          // ? Just in case the current crypto doesnt have an ID
          const cryptoCoin = {
            collectionId: ele.id,
          };
          cryptoCollection_ngrx.push(cryptoCoin);
        }
      });
      this.cryptoCollection_BS.next(cryptoCollection_ngrx);
    });
    console.log('Crypto Service , set single cryptos');
    return of(true);
  }
}
