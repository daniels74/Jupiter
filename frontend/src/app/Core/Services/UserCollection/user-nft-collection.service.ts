import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseUrl } from '../../../Root/app.module';
import { WINDOW } from '../../../window-token';
import { NFTId, SingleNFT } from '../../Interfaces/singleNFT';
import { NFT } from '../../Interfaces/top-trending';
import { CoinGeckoApiService } from '../coin-gecko-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserNftCollectionService {
  constructor(
    @Inject(BaseUrl) private local_origin: string,
    @Inject(WINDOW) private window: Window,
    private http: HttpClient,
    private CoinGeckoApiService: CoinGeckoApiService,
  ) {}

  origin = this.local_origin ? this.local_origin : this.window.location.origin;

  nftCollectionBehaviorSubject = new BehaviorSubject<SingleNFT[]>([]);
  nftCollection = this.nftCollectionBehaviorSubject.asObservable();

  postNftId(nftId: string): Observable<any> {
    return this.http.post(this.origin + '/nftid', {
      nftid: nftId,
    });
  }

  setUserFullNftCollection(allNftIds: any[]) {
    const nftCollection: any[] = [];
    if (allNftIds) {
      allNftIds.forEach((ele: NFTId) => {
        if (ele.nftid) {
          this.CoinGeckoApiService.getSingleNFT(ele.nftid).subscribe((res) => {
            const nft = {
              ...res,
              collectionId: ele.id,
            };
            nftCollection.push(nft);
          });
        } else {
          const nft = {
            collectionId: ele.id,
          };
          nftCollection.push(nft);
        }
      });
    }
    this.nftCollectionBehaviorSubject.next(nftCollection);
  }
}
