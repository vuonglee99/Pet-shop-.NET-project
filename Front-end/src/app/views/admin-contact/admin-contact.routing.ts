import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContactComponent} from './admin-contact.component' ;
import {AdminContactDetailComponent} from './admin-contact-detail/admin-contact-detail.component';


const routes: Routes = [
  {
    path: '',
    component: AdminContactComponent,
    data: {
      title: 'Contact'
    }
  },
  {
    path: ':contact_id',
    component: AdminContactDetailComponent,
    data: {
      title: 'Contact-detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminContactRoutingModule {}
