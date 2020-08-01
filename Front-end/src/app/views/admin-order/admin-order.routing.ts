import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminOrderComponent} from './admin-order.component';
import {AdminOrderDetailComponent} from './admin-order-detail/admin-order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOrderComponent,
    data: {
      title: 'Order'
    }
  },
  {
    path: ':order_id',
    component: AdminOrderDetailComponent,
    data: {
      title: 'Order-Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOrderRoutingModule {}
