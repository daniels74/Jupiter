import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserComponent],
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
