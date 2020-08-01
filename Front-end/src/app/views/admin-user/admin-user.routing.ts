import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUserComponent} from './admin-user.component';
import {AdminUserDetailComponent} from './admin-user-detail/admin-user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserComponent,
    data: {
      title: 'User'
    }
  },
  {
    path: ':user_id',
    component: AdminUserDetailComponent,
    data: {
      title: 'User-detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule {}
