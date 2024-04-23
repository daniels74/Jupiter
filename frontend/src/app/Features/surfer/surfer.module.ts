import { NgModule } from '@angular/core';
import { SurferComponent } from './surfer.component';
import { SurferRoutingModule } from './surfer-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SurferBasicInfoComponent } from './Components/surfer-basic-info/surfer-basic-info.component';
import { SurferCryptoComponent } from './Components/surfer-crypto/surfer-crypto.component';

@NgModule({
  declarations: [SurferComponent],
  imports: [
    SurferRoutingModule,
    CommonModule,
    MatButtonModule,
    SurferBasicInfoComponent,
    SurferCryptoComponent,
  ],
})
export class SurferModule {}
