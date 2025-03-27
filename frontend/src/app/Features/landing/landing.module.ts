import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
// import { IvyCarouselModule } from 'angular-responsive-carousel-ng16';
import { CarouselElementComponent } from './Components/carousel-element/carousel-element.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ChartComponent } from '../user/Components/chart/chart.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    // IvyCarouselModule,
    CarouselModule,
    CarouselElementComponent,
    ChartComponent,
  ],
})
export class LandingModule {}
