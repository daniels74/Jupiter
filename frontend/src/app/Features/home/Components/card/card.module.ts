import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
//import { BorderglowModule } from 'src/app/Shared/borderglow/borderglow.module';

@NgModule({
  declarations: [CardComponent],
  //imports: [BorderglowModule],
  imports: [CommonModule, MatButtonModule],
  exports: [CardComponent],
})
export class CardComponentModule {}
