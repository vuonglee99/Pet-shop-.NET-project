import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminNewsComponent} from './admin-news.component';
import {AdminNewsAddComponent} from './admin-news-add/admin-news-add.component';
import {AdminNewsDetailComponent} from './admin-news-detail/admin-news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminNewsComponent,
    data: {
      title: 'News'
    }
  },
  {
    path: 'add',
    component: AdminNewsAddComponent,
    data: {
      title: 'News-add'
    }
  },
  {
    path: ':news_id',
    component: AdminNewsDetailComponent,
    data: {
      title: 'New-detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNewsRoutingModule {}
