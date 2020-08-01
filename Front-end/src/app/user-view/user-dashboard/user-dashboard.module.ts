import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {CategoriesService,ProductsService,NewsService,CommentsService,CartsService,OrdersService,
  NotificationsService } from '../../shared/service-proxy.module';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import {UserDashboardRoutingModule} from './user-dashboard.routing';
import {UserDashboardComponent} from './user-dashboard.component';
import {ProductListComponent} from './product/product-list.component';
import {NewsListComponent} from './news/news-list.component';
import {ProductSearchComponent} from './product-search/product-search.component';
import {ProductDetailComponent} from './product/product-detail.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {CommentListComponent} from './commentList/comment-list.component';
import { NgImageSliderModule } from 'ng-image-slider';
import {CartComponent} from './shopping/cart.component';
import {CheckoutComponent} from './shopping/checkout.component';
import {OrderListComponent} from './shopping/order-list.component';
import {OrderDetailComponent} from './shopping/order-detail.component';

@NgModule({
  imports: [
    UserDashboardRoutingModule,
    AppCommonModule,
    BsDropdownModule,
    SpinnerOverlayModule,
    SharedModule,
    ButtonsModule.forRoot(),
    NgImageSliderModule
  ],
  declarations: [
    UserDashboardComponent,
    ProductListComponent,
    NewsListComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    TopMenuComponent,
    CommentListComponent,
    CartComponent,
    CheckoutComponent,
    OrderListComponent,
    OrderDetailComponent
  ],

  providers:[
    HttpClientModule,
    CategoriesService,
    ProductsService,
    NewsService,
    CommentsService,
    CartsService,
    OrdersService,
    NotificationsService
  ],
  exports:[
    ProductListComponent
  ]
})
export class UserDashboardModule { }
