import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostDashboardComponent} from './post-dashboard.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostAddComponent} from './post-add/post-add.component';
import {NewsListComponent} from './news/news-list.component';
import {NewsDetailComponent} from './news/news-detail.component';
import {MyPostComponent} from './my-post/my-post.component';
import {AccountSettingComponent} from './account-setting/account-setting.component';


const routes: Routes = [
  {
    path: '',
    component:PostDashboardComponent ,
    data: {
      title: 'Bảng tin'
    }
  },
  {
    path: 'add',
    component:PostAddComponent ,
    data: {
      title: 'Đăng bài'
    }
  },
  {
    path: 'news',
    component:NewsListComponent ,
    data: {
      title: 'Đăng bài'
    }
  },
  {
    path: 'my-post',
    component:MyPostComponent ,
    data: {
      title: 'Bài đăng của tôi'
    }
  },
  {
    path: 'account',
    component:AccountSettingComponent ,
    data: {
      title: 'Tài khoản'
    }
  },
  {
    path: ':post_id',
    component:PostDetailComponent ,
    data: {
      title: 'Chi tiết bài đăng'
    }
  },
  {
    path: 'news/:news_id',
    component:NewsDetailComponent ,
    data: {
      title: 'Chi tiết tin tức'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
