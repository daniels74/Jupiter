import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselElementComponent } from './carousel-element.component';
import { GlowifyDirective } from '../../../../Shared/CustomDirectives/glowify.directive';
@NgModule({
  declarations: [CarouselElementComponent, GlowifyDirective],
  imports: [CommonModule],
  exports: [CarouselElementComponent],
})
export class CarouselElementModule {}
