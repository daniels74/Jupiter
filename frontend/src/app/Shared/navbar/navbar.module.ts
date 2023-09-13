import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  exports: [NavbarComponent],
})
export class NavbarModule {}
