import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, timer } from 'rxjs';
import { CoinGeckoApiService } from '../../../../Core/Services/coin-gecko-api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  public chart: any;

  cryptoChartData: any[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { color: 'lightblue' },
      },
      x: {
        ticks: { color: 'lightblue' },
      },
    },
  };

  public lineChartLegend = true;
  chartActive = false;

  // Counter
  counter = 30;
  tick = 1000;
  countDown_Sub = timer(0, this.tick).pipe(
    map(() => {
      if (this.counter === 0) {
        this.counter = 30;
      } else {
        this.counter--;
      }
    }),
  );

  // Screen Sizing
  isBigScreen = window.innerWidth < 700 ? false : true;
  height: string = this.isBigScreen ? '65vh' : '25vh';
  width: string = this.isBigScreen ? '70vw' : '100vw';

  constructor(
    private CoinGeckoApi: CoinGeckoApiService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    // ! See currrent chart data for selected crypto
    this.CoinGeckoApi.marketChartData_O.subscribe((data) => {
      this.cryptoChartData = data;
      // Fetch Failure
      if (this.cryptoChartData.length <= 1) {
        this.chartActive = false;
        this.spinner.show('primary');
        this.countDown_Sub.subscribe();
      } else {
        // Fetch Successs
        this.setChart();
        this.countDown_Sub.subscribe();
        this.spinner.hide();
        this.chartActive = true;
      }
    });
  }

  setChart() {
    this.lineChartData = {
      labels: this.cryptoChartData.map((ele) => {
        const eleDate = new Date(ele[0]);
        const date = eleDate.getDate();
        const month = eleDate.getMonth();
        const Year = eleDate.getFullYear();
        const day = eleDate.getDay();

        return `${month}, ${date}, ${Year}`;
      }),
      datasets: [
        {
          data: this.cryptoChartData.map((ele) => {
            return ele[1];
          }),
          label: 'USD Price',
          pointRadius: 0,
          pointHitRadius: 4,
          pointBackgroundColor: 'darkblue',
          pointBorderColor: 'lightblue',
          fill: false,
          tension: 0.5,
          backgroundColor: 'blue', // for chart toolbox
          borderColor: 'lightblue', // for line
          borderWidth: 1,
        },
      ],
    };
  }
}
