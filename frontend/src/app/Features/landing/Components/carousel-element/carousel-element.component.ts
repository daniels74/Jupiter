import { Component, Input } from '@angular/core';
import { GlowifyModule } from '../../../../Shared/CustomDirectives/glowify.module';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { ChartComponent } from '../../../../Features/user/Components/chart/chart.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [GlowifyModule, ChartComponent, CommonModule],
  selector: 'app-carousel-element',
  templateUrl: './carousel-element.component.html',
  styleUrls: ['./carousel-element.component.scss'],
})
export class CarouselElementComponent {
  @Input() Item: any;
  @Input() name: any;

  @Input() cryptoImg = '';

  cryptoname!: any;

  miniChartState = false;

  curretnChartData = [];

  myImg!: any;

  constructor(
    private coinGeckoApi: CoinGeckoApiService,
    private http: HttpClient,
  ) {
    this.cryptoname = this.name;
  }

  ngOnInit() {
    // this.http.get(this.cryptoImg).subscribe((res) => {
    //   this.myImg = res;
    // });
    // this.coinGeckoApi.getImage(this.cryptoImg).subscribe((res) => {
    //   this.myImg = res;
    // });
  }

  toggleChart() {
    this.coinGeckoApi.getChartData(this.Item.item.id).subscribe((res) => {
      console.log('User Page Collection Card: getChartData RESPONSE: ', res);
    });
  }
}
