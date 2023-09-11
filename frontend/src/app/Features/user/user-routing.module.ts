import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { userProfileGuard } from '../../Shared/guards/user-profile.guard';

const routes: Routes = [
  { path: '', canActivate: [userProfileGuard], component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
