import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {AdminOrderComponent} from './admin-order.component';
import {AdminOrderRoutingModule} from './admin-order.routing';
import {AdminOrderDetailComponent} from './admin-order-detail/admin-order-detail.component';
import {OrdersService,NotificationsService} from '../../shared/service-proxy.module';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';

@NgModule({
  imports: [
    SpinnerOverlayModule,
    SharedModule,
    AdminOrderRoutingModule,
    AppCommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    AdminOrderComponent,
    AdminOrderDetailComponent
  ],
  providers:[
    OrdersService,
    HttpClientModule,
    NotificationsService
  ]
})
export class AdminOrderModule { }
