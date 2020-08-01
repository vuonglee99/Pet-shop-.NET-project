import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {AdminPostComponent} from './admin-post.component';
import {AdminPostRoutingModule} from './admin-post.routing';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import {PostsService,NotificationsService} from '../../shared/service-proxy.module';
import {AdminPostDetailComponent} from './admin-post-detail/admin-post-detail.component';
import {AdminPostAddComponent} from './admin-post-add/admin-post-add.component';

@NgModule({
  imports: [
    AdminPostRoutingModule,
    AppCommonModule,
    BsDropdownModule,
    SpinnerOverlayModule,
    SharedModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    AdminPostComponent,
    AdminPostDetailComponent,
    AdminPostAddComponent
  ],

  providers:[
    NotificationsService,
    PostsService,
    HttpClientModule
  ]
})
export class AdminPostModule { }
