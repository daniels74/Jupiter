import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
//import { BorderglowModule } from 'src/app/Shared/borderglow/borderglow.module';

@NgModule({
  declarations: [CardComponent],
  //imports: [BorderglowModule],
  exports: [CardComponent],
})
export class CardComponentModule {}
