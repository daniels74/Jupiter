import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

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
import { MobileDatacardComponent } from './Components/MobileDatacard/MobileDataCard.component';
import { ChartViewSmallComponent } from './Components/chart-view-small/chart-view-small.component';
import { RouterLink } from '@angular/router';
import { NoteCardComponent } from './Components/PageSizes/large-page/components/note-card/note-card.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SettingsViewComponent } from './Components/PageSizes/large-page/components/settings-view/settings-view.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    UserComponent,
    CryptoCardComponent,
    LargePageComponent,
    SmallPageComponent,
    ChartViewComponent,
    ChartViewSmallComponent,
    NoteCardComponent,
  ],
  imports: [
    SettingsViewComponent,
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
    MobileDatacardComponent,
    ChartComponent,
    JsonPipe,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class UserModule {}
