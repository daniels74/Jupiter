import { NgModule } from '@angular/core';
import { SurferComponent } from './surfer.component';
import { SurferRoutingModule } from './surfer-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SurferBasicInfoComponent } from './Components/surfer-basic-info/surfer-basic-info.component';
import { SurferCryptoComponent } from './Components/surfer-crypto/surfer-crypto.component';
import { LargePageComponent } from './Components/PageSizes/large-page/large-page.component';
import { SmallPageComponent } from './Components/PageSizes/small-page/small-page.component';

@NgModule({
  declarations: [SurferComponent],
  imports: [
    SurferRoutingModule,
    CommonModule,
    MatButtonModule,
    SurferBasicInfoComponent,
    SurferCryptoComponent,
    LargePageComponent,
    SmallPageComponent,
  ],
})
export class SurferModule {}
