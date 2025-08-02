import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../../../Features/user/Components/chart/chart.component';

@Component({
  selector: 'app-mini-chart',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './mini-chart.component.html',
  styleUrl: './mini-chart.component.css',
})
export class MiniChartComponent {
  @Input() cryptoimg = '';
  @Input() cryptoName = '';
}
