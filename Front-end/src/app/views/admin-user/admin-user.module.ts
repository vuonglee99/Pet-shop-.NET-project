import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {AdminUserComponent} from './admin-user.component';
import {UsersService,OrdersService,PostsService,NotificationsService} from '../../shared/service-proxy.module';
import {AdminUserRoutingModule} from './admin-user.routing';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import {AdminUserDetailComponent} from './admin-user-detail/admin-user-detail.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    AppCommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SpinnerOverlayModule,
    SharedModule
  ],
  declarations: [
    AdminUserComponent,
    AdminUserDetailComponent
  ],
  providers:[
    UsersService,
    HttpClientModule,
    OrdersService,
    PostsService,
    NotificationsService
  ]
})
export class AdminUserModule { }
