import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserNftCollectionService } from '../../Core/Services/UserCollection/user-nft-collection.service';

@Injectable({
  providedIn: 'root',
})
export class Nft_Collection_Retrieval {
  constructor(private nftService: UserNftCollectionService) {}

  getFullNftListFromIds() {
    let s!: any;
    this.nftService.setUserFullNftCollection().subscribe((res) => {
      s = res;
      console.log('NFT Resolver ! ', res);
    });
    return s;
  }
}

export const nftCollectionResolver: ResolveFn<boolean> = (route, state) => {
  return inject(Nft_Collection_Retrieval).getFullNftListFromIds();
};
