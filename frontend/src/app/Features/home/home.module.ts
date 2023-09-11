import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { CardComponentModule } from './Components/card/card.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CardComponentModule, CommonModule, HomeRoutingModule],
  exports: [RouterModule],
})
export class HomeModule {}
