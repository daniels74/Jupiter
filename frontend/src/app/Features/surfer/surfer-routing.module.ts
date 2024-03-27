import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurferComponent } from './surfer.component';

const routes: Routes = [{ path: '', component: SurferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurferRoutingModule {}
