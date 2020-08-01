import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProductComponent } from './admin-product.component';
import {AdminProductDetailComponent} from './admin-product-detail/admin-product-detail.component';
import {AdminProductAddComponent} from './admin-product-add/admin-product-add.component';
import {AdminCateAddComponent} from './cate-add/cate-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminProductComponent,
    data: {
      title: 'Product'
    }
  },
  {
    path: 'add',
    component: AdminProductAddComponent,
    data: {
      title: 'Product-Add'
    }
  },
  {
    path: 'cate-add',
    component: AdminCateAddComponent,
    data: {
      title: 'cate-Add'
    }
  },
  {
    path: ':product_id',
    component: AdminProductDetailComponent,
    data: {
      title: 'Product-Detail'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductRoutingModule {}
