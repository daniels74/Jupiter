import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlowifyDirective } from './glowify.directive';

@NgModule({
  declarations: [GlowifyDirective],
  exports: [GlowifyDirective],
  imports: [CommonModule],
})
export class GlowifyModule {}
