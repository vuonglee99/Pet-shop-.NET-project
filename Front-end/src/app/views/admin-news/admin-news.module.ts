import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {UsersService,NewsService,NewsViewModel} from '../../shared/service-proxy.module';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import { CommonModule } from '@angular/common';
import {AdminNewsRoutingModule} from './admin-news.routing';
import {AdminNewsComponent} from './admin-news.component';
import {AdminNewsAddComponent} from './admin-news-add/admin-news-add.component';
import {AdminNewsDetailComponent} from './admin-news-detail/admin-news-detail.component';


@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SpinnerOverlayModule,
    SharedModule,
    AdminNewsRoutingModule,
    
  ],
  declarations: [
    AdminNewsComponent,
    AdminNewsAddComponent,
    AdminNewsDetailComponent
  ],
  providers:[
    UsersService,
    HttpClientModule,
    NewsService,
    AdminNewsRoutingModule
  ]
})
export class AdminNewsModule { }
