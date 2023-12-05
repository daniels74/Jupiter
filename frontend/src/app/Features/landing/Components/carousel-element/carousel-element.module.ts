import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselElementComponent } from './carousel-element.component';
import { GlowifyModule } from '../../../../Shared/CustomDirectives/glowify.module';
@NgModule({
  declarations: [CarouselElementComponent],
  imports: [CommonModule, GlowifyModule],
  exports: [CarouselElementComponent],
})
export class CarouselElementModule {}
