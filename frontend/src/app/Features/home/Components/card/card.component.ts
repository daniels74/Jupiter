import { Component, Input, OnInit } from '@angular/core';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { CryptoService } from '../../../../Core/Services/UserCollection/crypto.service';
import { AuthService } from '../../../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuth } from '../../../../Shared/State/Selectors/auth.selector';
import { UserNftCollectionService } from '../../../../Core/Services/UserCollection/user-nft-collection.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() dataImage!: string;
  @Input() dataName!: string;
  @Input() dataMarketCapRank!: any;
  @Input() coinId!: string;
  @Input() collectionClassification!: string;

  //! Auth State
  authState: any = false;

  cardClass =
    window.innerWidth < 700
      ? {
          height: '14rem',
          width: '100vw',
          marginTop: '2rem',
          marginBottom: '2rem',
          scrollSnapAlign: 'start',
        }
      : {
          height: '25vh',
          width: '15vw',
          marginLeft: '2rem',
        };

  btnClass =
    window.innerWidth < 700
      ? {
          height: '75%',
          width: 'auto',
        }
      : {
          height: '75%',
          width: '90%',
        };

  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService,
    private nftService: UserNftCollectionService,
    private coinGeckoService: CoinGeckoApiService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.select(selectAuth).subscribe((state) => {
      this.authState = state;
    });
  }

  getMoreInfo() {
    this.coinGeckoService.getSingleCoin(this.coinId).subscribe((res) => {
      console.log('API for single coin working: ', res);
    });
  }
  // // Save string id of Crypto into database,
  // // this id is later used to look up the coin for more info
  saveToCollection(coinId: string) {
    if (this.collectionClassification === 'crypto') {
      console.log('crypto id saving to db: ', coinId);
      // // Save Crypto ID string into database
      this.cryptoService.postCryptoId(coinId).subscribe((postRes) => {
        //this.authService.setPermissions(postRes.jwt);
        this.authService.setSessionToken(postRes.jwt);
      });
    } else if (this.collectionClassification === 'nft') {
      // // Save NFT ID string into database
      console.log('id', coinId);
      this.nftService.postNftId(coinId).subscribe((postRes) => {
        // this.authService.setPermissions(postRes.jwt);
        this.authService.setSessionToken(postRes.jwt);
      });
    }
  }
}
