import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Surfer } from '../../../../Core/Interfaces/surfer.interface';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { SingleNFT } from '../../../../Core/Interfaces/singleNFT';
import { SurferService } from '../../../../Core/Services/surfer.service';

@Component({
  selector: 'surfer-nfts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './surfer-nfts.component.html',
  styleUrls: ['./surfer-nfts.component.css'],
})
export class SurferNftsComponent {
  @Input() surfer!: Surfer;
  nfts: SingleNFT[] = [];

  constructor(
    private coinGeckoAPI: CoinGeckoApiService,
    private surferService: SurferService,
  ) {}
  ngOnInit() {
    // if (this.surfer.nfts) {
    //   this.surfer.nfts.forEach((ele) => {
    //     if (ele.nftid) {
    //       this.coinGeckoAPI.getSingleNFT(ele.nftid).subscribe((res) => {
    //         this.nfts.push(res);
    //       });
    //     }
    //   });
    //   console.log('NFTS in small view surfer: ', this.nfts);
    // }
    this.surferService.surferNFTS$.subscribe((res) => {
      console.log('NFTS in nft component: ', res);
      this.nfts = res;
    });
  }
}
