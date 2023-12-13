import { Component, Input } from '@angular/core';
import { GlowifyModule } from '../../../../Shared/CustomDirectives/glowify.module';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';
import { ChartComponent } from '../../../../Features/user/Components/chart/chart.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [GlowifyModule, ChartComponent, CommonModule],
  selector: 'app-carousel-element',
  templateUrl: './carousel-element.component.html',
  styleUrls: ['./carousel-element.component.css'],
})
export class CarouselElementComponent {
  @Input() Item!: any;
  @Input() name: any;

  cryptoname!: any;

  miniChartState = false;

  curretnChartData = [];

  constructor(private coinGeckoApi: CoinGeckoApiService) {
    this.cryptoname = this.name;
  }

  toggleChart() {
    this.coinGeckoApi.getChartData(this.Item.item.id).subscribe((res) => {
      console.log('User Page Collection Card: getChartData RESPONSE: ', res);
    });
  }
}
