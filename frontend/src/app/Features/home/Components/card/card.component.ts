import { Component, Input, OnInit } from '@angular/core';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { CryptoService } from '../../../../Core/Services/UserCollection/crypto.service';
import { AuthService } from '../../../../Core/Services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuth } from '../../../../Shared/State/Selectors/auth.selector';
import { UserNftCollectionService } from '../../../../Core/Services/UserCollection/user-nft-collection.service';
// import { CryptoCoinObj } from 'src/app/Core/Interfaces/top-trending';

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
  @Input() cryptosCollection!: any[];
  @Input() nftCollection: any[] = [];

  PopUpState = false;
  NFTPopUpState = false;

  //! Auth State
  authState: any = false;

  cardClass =
    window.innerWidth < 700
      ? {
          height: '100%',
          width: '100vw',
          scrollSnapAlign: 'start',
        }
      : {
          height: '25vh',
          width: '25vw',
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
    private nftService: UserNftCollectionService,
    private coinGeckoService: CoinGeckoApiService,
    private store: Store,
    private cryptoService: CryptoService,
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
      if (this.cryptosCollection.length < 6) {
        // // Save Crypto ID string into database
        console.log('crypto id saving to db: ', coinId);
        console.log('crypto list length: ', this.cryptosCollection.length);
        this.cryptoService.postCryptoId(coinId).subscribe((postRes) => {
          //this.authService.setPermissions(postRes.jwt);
          // !this.authService.setSessionToken(postRes.jwt);
          console.log('Crypto Post response:', postRes);
        });
      } else {
        console.log(
          'Crypto cannot be saved, capacity reached: ',
          this.cryptosCollection.length,
        );
        this.PopUpState = true;
        setTimeout(() => {
          this.PopUpState = false;
        }, 5000);
      }
    } else if (this.collectionClassification === 'nft') {
      if (this.nftCollection.length < 6) {
        // // Save NFT ID string into database
        console.log('id', coinId);
        this.nftService.postNftId(coinId).subscribe((postRes) => {
          // this.authService.setPermissions(postRes.jwt);
          this.authService.setSessionToken(postRes.jwt);
        });
      } else {
        console.log(
          'NFT cannot be saved, capacity reached: ',
          this.nftCollection.length,
        );
        this.NFTPopUpState = true;
        setTimeout(() => {
          this.NFTPopUpState = false;
        }, 5000);
      }
    }
  }
}
