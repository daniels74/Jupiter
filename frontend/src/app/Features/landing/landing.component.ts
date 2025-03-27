import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCrypto } from '../../Shared/State/Selectors/crypto.selectors';
import { CoinGeckoApiService } from '../../Core/Services/coin-gecko-api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  customOptions: OwlOptions = {
    autoplay: true,
    smartSpeed: 200,
    autoplayHoverPause: true,
    autoplaySpeed: 1200,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  trending_cryptos: any = [];
  title_container_width = window.innerWidth <= 700 ? 'auto' : '50%';
  title_container_height = window.innerWidth <= 700 ? '25%' : '30%';
  titleFontSize: boolean = window.innerWidth <= 700 ? true : false;
  crpyoinfo_container_width = window.innerWidth <= 700 ? '90%' : 'auto';
  crpyoinfo_container_height = window.innerWidth <= 700 ? '30%' : '30%';

  cellsToShow = window.innerWidth <= 700 ? 1 : 4;
  carouselWidth = window.innerWidth <= 700 ? 250 : 1000;
  carouselHeight = window.innerWidth <= 700 ? 200 : 300;

  miniChartState = false;

  chartActiveState = false;

  cryptoName = 'HELLO';

  cryptoimg = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    //this.width = (event.target as Window).innerWidth;
    if ((event.target as Window).innerWidth <= 699) {
      this.title_container_width = 'auto';
      this.title_container_height = '25%';
      this.crpyoinfo_container_width = '90%';
      this.crpyoinfo_container_height = '30%';
    } else if ((event.target as Window).innerWidth > 700) {
      this.title_container_width = '50%';
      this.title_container_height = '30%';
      this.crpyoinfo_container_width = '40%';
      this.crpyoinfo_container_height = '30%';
    }
    // this.height = (event.target as Window).innerHeight;
  }
  images: any[] = [];
  constructor(
    private coinGeckoApi: CoinGeckoApiService,
    private store: Store,
  ) {}
  ngOnInit() {
    this.store.select(selectCrypto).subscribe((trending_cryptos) => {
      this.trending_cryptos = trending_cryptos;
      //   // Not in use because does not allow div elements, only imgages
      //   this.trending_cryptos.forEach((element: any) => {
      //     const obj = { path: element.item.large };
      //     this.images.push(obj);
      //     return;
      //   });
      //   this.images.reverse();
      //   console.log('Images', this.images);
    });
  }

  toggleChart(state: boolean) {
    this.miniChartState = state;
  }

  keepActive() {
    if (this.chartActiveState) {
      this.chartActiveState = false;
    } else {
      this.chartActiveState = true;
    }
  }

  setName(crypto: any) {
    this.cryptoName = crypto.name;
    this.cryptoimg = crypto.large;
    console.log('crypto: ', crypto);
  }
}
