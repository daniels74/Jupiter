import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { BaseUrl } from '../../../Root/app.module';
import { WINDOW } from '../../../window-token';
import { NFTId, SingleNFT } from '../../Interfaces/singleNFT';
import { NFT } from '../../Interfaces/top-trending';
import { CoinGeckoApiService } from '../coin-gecko-api.service';
import { Store } from '@ngrx/store';
import { selectUserNftCollection } from '../../../Shared/State/Selectors/userNftCollection.selector';

@Injectable({
  providedIn: 'root',
})
export class UserNftCollectionService {
  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    private http: HttpClient,
    private CoinGeckoApiService: CoinGeckoApiService,
    private store: Store,
  ) {}

  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  nftCollectionBehaviorSubject = new BehaviorSubject<SingleNFT[]>([]);
  nftCollection = this.nftCollectionBehaviorSubject.asObservable();

  postNftId(nftId: string): Observable<any> {
    //1 First Save NFT Id into DB
    return this.http.post(this.origin + '/nftid', {
      nftid: nftId,
    });
    // .pipe(
    //   map((res) => {
    //     //2 Look up NFT full info for displaying purposes
    //     this.CoinGeckoApiService.getSingleNFT(nftId).subscribe((nftres) => {
    //       const nft = {
    //         ...nftres,
    //       };
    //       const collection = this.nftCollectionBehaviorSubject.value;
    //       collection.push(nft);
    //     });
    //     return res;
    //   }),
    // );
  }

  deleteNftId(disposeNft: string): Observable<any> {
    return this.http
      .delete(this.origin + '/nftid/entrydelete/nftid/' + disposeNft)
      .pipe(
        map((res) => {
          const newCollection = this.nftCollectionBehaviorSubject.value.filter(
            (ele) => ele.id != disposeNft,
          );
          this.nftCollectionBehaviorSubject.next(newCollection);
          return res;
        }),
      );
  }

  // Uses nft ids to look them up and set the full nft collection observable
  setUserFullNftCollection(): Observable<boolean> {
    const nftCollection: Array<any> = [];
    this.store.select(selectUserNftCollection).subscribe((allNftIds) => {
      console.log('NFT ids:', allNftIds);
      if (allNftIds) {
        allNftIds.forEach((ele: NFTId) => {
          if (ele.nftid) {
            this.CoinGeckoApiService.getSingleNFT(ele.nftid).subscribe(
              (res) => {
                console.log('NFT looked up :', res);
                const nft = {
                  ...res,
                  collectionId: ele.id,
                };
                nftCollection.push(nft);
              },
            );
          } else {
            const nft = {
              collectionId: ele.id,
            };
            nftCollection.push(nft);
          }
        });
      }
      this.nftCollectionBehaviorSubject.next(nftCollection);
    });
    return of(true);
  }
}
