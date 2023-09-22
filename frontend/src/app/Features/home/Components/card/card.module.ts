import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
//import { BorderglowModule } from 'src/app/Shared/borderglow/borderglow.module';

@NgModule({
  declarations: [CardComponent],
  //imports: [BorderglowModule],
  imports: [CommonModule],
  exports: [CardComponent],
})
export class CardComponentModule {}
