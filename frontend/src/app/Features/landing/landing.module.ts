import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
// import { IvyCarouselModule } from 'angular-responsive-carousel-ng16';
import { CarouselElementComponent } from './Components/carousel-element/carousel-element.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ChartComponent } from '../user/Components/chart/chart.component';
import { MatButtonModule } from '@angular/material/button';
import { MiniChartComponent } from './Components/mini-chart/mini-chart.component';
import { AboutComponent } from './Components/about/about.component';
@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    // IvyCarouselModule,
    CarouselModule,
    CarouselElementComponent,
    ChartComponent,
    MatButtonModule,
    MiniChartComponent,
    AboutComponent
],
})
export class LandingModule {}
