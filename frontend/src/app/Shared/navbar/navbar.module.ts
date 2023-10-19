import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    NgxSpinnerModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
