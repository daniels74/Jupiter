import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselElementComponent } from './carousel-element.component';

@NgModule({
  declarations: [CarouselElementComponent],
  imports: [CommonModule],
  exports: [CarouselElementComponent],
})
export class CarouselElementModule {}
