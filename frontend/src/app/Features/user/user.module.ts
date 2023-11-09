import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CryptoCardComponent } from './Components/crypto-card/crypto-card.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LargePageComponent } from './Components/PageSizes/large-page/large-page.component';
import { SmallPageComponent } from './Components/PageSizes/small-page/small-page.component';

@NgModule({
  declarations: [
    UserComponent,
    CryptoCardComponent,
    LargePageComponent,
    SmallPageComponent,
  ],
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    NgChartsModule,
    NgxSpinnerModule,
  ],
})
export class UserModule {}
