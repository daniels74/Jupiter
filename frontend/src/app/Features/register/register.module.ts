import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RegisterRoutingModule,
    NgxSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class RegisterModule {}
