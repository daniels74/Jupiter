import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { CardComponentModule } from './Components/card/card.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeBigComponent } from './Components/pageSizes/home-big/home-big.component';
import { HomeSmallComponent } from './Components/pageSizes/home-small/home-small.component';
import { PaginatorComponent } from './Components/paginator/paginator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBigComponent,
    HomeSmallComponent,
    PaginatorComponent,
  ],
  imports: [
    CardComponentModule,
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  exports: [RouterModule],
})
export class HomeModule {}
