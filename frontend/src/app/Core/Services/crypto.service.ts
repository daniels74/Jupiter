import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WINDOW } from '../../window-token';
import { User } from '../Interfaces/User.interface';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { selectUser } from '../../Shared/State/Selectors/users.selector';
import { CryptoId } from '../Interfaces/top-trending';
import { CoinGeckoApiService } from './coin-gecko-api.service';

@Injectable({
  providedIn: 'root',
})
export class CryptoService implements OnInit {
  user!: User;
  userSub!: Subscription;
  origin = this.window.location.origin; // 'http://localhost:3000';
  // cryptoSingleCoinList: any[] = [];
  cryptoSingleCoinListBehaviorSubject = new BehaviorSubject<any[]>([]);
  cryptoSingleCoinListObservable =
    this.cryptoSingleCoinListBehaviorSubject.asObservable();

  constructor(
    @Inject(WINDOW) private window: Window,
    private http: HttpClient,
    private store: Store,
    private CoinGecko: CoinGeckoApiService,
  ) {}
  ngOnInit(): void {
    this.userSub = this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe((currentUser) => {
        this.user = currentUser;
      });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  postCryptoId(cryptoStringId: string): Observable<any> {
    return this.http.post(this.origin + '/cryptoid', {
      cryptoid: cryptoStringId,
    });
  }

  getAllCryptoIds(user: User): Observable<any> {
    return this.http.get(this.origin + '/cryptoid', {
      params: {
        userId: user.id,
      },
    });
  }

  deleteCryptoId(disposeCrypto: string): Observable<any> {
    return this.http.delete(
      this.origin + '/cryptoid/entrydelete/cryptoid/' + disposeCrypto,
    );
  }

  deleteCryptoEntryById(id: number): Observable<any> {
    return this.http.delete(this.origin + '/cryptoid/entrydelete/' + id);
  }

  setCryptoSingleCoins(allCryptoIds: any[]) {
    console.log('All ids: ', allCryptoIds);
    const cryptoCollection: any[] = [];
    allCryptoIds.forEach((ele: CryptoId) => {
      if (ele.cryptoid) {
        this.CoinGecko.getSingleCoin(ele.cryptoid).subscribe((res) => {
          console.log('A coin lookup: ', res);
          const cryptoCoin = {
            ...res,
            collectionId: ele.id,
          };
          cryptoCollection.push(cryptoCoin);
        });
      } else {
        const cryptoCoin = {
          collectionId: ele.id,
        };
        cryptoCollection.push(cryptoCoin);
      }
    });
    this.cryptoSingleCoinListBehaviorSubject.next(cryptoCollection);
  }
}
