import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsersearchComponent } from './SubFeatures/usersearch/usersearch.component';
import { UserCardComponent } from './SubFeatures/usersearch/Components/user-card/user-card.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NavbarComponent, UsersearchComponent, UserCardComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    NgxSpinnerModule,
    MatButtonModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
