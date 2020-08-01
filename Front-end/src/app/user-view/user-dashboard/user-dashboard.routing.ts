import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDashboardComponent} from './user-dashboard.component';
import {ProductListComponent} from './product/product-list.component';
import {NewsListComponent } from "./news/news-list.component";
import {ProductSearchComponent} from './product-search/product-search.component';
import {ProductDetailComponent} from './product/product-detail.component';
import {CartComponent} from './shopping/cart.component';
import {CheckoutComponent} from './shopping/checkout.component';
import {OrderListComponent} from './shopping/order-list.component';
import {OrderDetailComponent} from './shopping/order-detail.component';


const routes: Routes = [
  {
    path: '',
    component:UserDashboardComponent ,
    data: {
      title: 'Trang chủ'
    }
  },
  {
    path: 'product',
    component:ProductListComponent ,
    data: {
      title: 'Sản phẩm'
    }
  },
  {
    path: 'news',
    component:NewsListComponent ,
    data: {
      title: 'Tin tức'
    }
  },
  {
    path: 'cart',
    component:CartComponent ,
    data: {
      title: 'Giỏ hàng'
    }
  },
  {
    path: 'checkout',
    component:CheckoutComponent ,
    data: {
      title: 'Thủ tục thanh toán'
    }
  },
  {
    path: 'order',
    component:OrderListComponent ,
    data: {
      title: 'Danh sách đơn hàng'
    }
  },
  {
    path: 'product/:cate_id',
    component:ProductSearchComponent ,
    data: {
      title: 'Loại sản phẩm'
    }
  },
  {
    path: 'order/:order_id',
    component:OrderDetailComponent ,
    data: {
      title: 'Chi tiết đơn hàng'
    }
  },
  {
    path: 'product/detail/:product_id',
    component:ProductDetailComponent ,
    data: {
      title: 'Chi tiết sản phẩm'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule {}
