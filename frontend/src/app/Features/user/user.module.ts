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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ChartComponent } from './Components/chart/chart.component';
import { ChartViewComponent } from './Components/chart-view/chart-view.component';
import { GlowifyModule } from '../../Shared/CustomDirectives/glowify.module';
import { CryptodatacardComponent } from './Components/cryptodatacard/cryptodatacard.component';
import { ChartViewSmallComponent } from './Components/chart-view-small/chart-view-small.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    UserComponent,
    CryptoCardComponent,
    LargePageComponent,
    SmallPageComponent,
    ChartComponent,
    ChartViewComponent,
    ChartViewSmallComponent
  ],
  imports: [
    RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    NgChartsModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    GlowifyModule,
    CryptodatacardComponent,
  ],
})
export class UserModule {}
