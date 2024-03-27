import { NgModule } from '@angular/core';
import { SurferComponent } from './surfer.component';
import { SurferRoutingModule } from './surfer-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SurferComponent],
  imports: [SurferRoutingModule, CommonModule, MatButtonModule],
})
export class SurferModule {}
