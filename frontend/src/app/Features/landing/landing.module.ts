import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { IvyCarouselModule } from 'angular-responsive-carousel-ng16';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
//import { CarouselElementComponent } from './Components/carousel-element/carousel-element.component';
import { ChartComponent } from '../user/Components/chart/chart.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    // IvyCarouselModule,
    CommonModule,
    LandingRoutingModule,
    // CarouselElementComponent,
    ChartComponent,
  ],
})
export class LandingModule {}
