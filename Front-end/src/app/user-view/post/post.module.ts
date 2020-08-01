import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import {PostRoutingModule} from './post.routing';
import {PostsService,NewsService,UsersService} from '../../shared/service-proxy.module';
import {PostListComponent} from './post-list.component';
import {PostDashboardComponent} from './post-dashboard.component';
import {UserDashboardModule} from '../user-dashboard/user-dashboard.module';
import {PostSideMenuComponent} from './post-side-menu/post-side-menu.component';
//import {ProductListComponent} from '../user-dashboard/product/product-list.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostAddComponent} from './post-add/post-add.component';
import {NewsListComponent} from './news/news-list.component';
import {NewsDetailComponent} from './news/news-detail.component';
import {MyPostComponent} from './my-post/my-post.component';
import {AccountSettingComponent} from './account-setting/account-setting.component';

@NgModule({
  imports: [
    PostRoutingModule,
    AppCommonModule,
    BsDropdownModule,
    SpinnerOverlayModule,
    SharedModule,
    ButtonsModule.forRoot(),
    UserDashboardModule
  ],
  declarations: [
    PostListComponent,
    PostDashboardComponent,
    PostSideMenuComponent,
    PostDetailComponent,
    PostAddComponent,
    NewsListComponent,
    NewsDetailComponent,
    MyPostComponent,
    AccountSettingComponent
  ],

  providers:[
    HttpClientModule,
    PostsService,
    NewsService,
    UsersService
    
  ]
})
export class PostModule { }
