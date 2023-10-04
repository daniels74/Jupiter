import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel-ng16';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CarouselElementComponent } from './Components/carousel-element/carousel-element.component';
import { CarouselElementModule } from './Components/carousel-element/carousel-element.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    // BrowserModule,
    // FormsModule,
    CarouselElementModule,
    IvyCarouselModule,
    CommonModule,
    LandingRoutingModule,
  ],
})
export class LandingModule {}
