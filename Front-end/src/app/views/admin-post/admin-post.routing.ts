import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPostComponent} from './admin-post.component';
import {AdminPostDetailComponent} from './admin-post-detail/admin-post-detail.component';
import {AdminPostAddComponent} from './admin-post-add/admin-post-add.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPostComponent,
    data: {
      title: 'Post'
    }
  },
  {
    path: 'add',
    component: AdminPostAddComponent,
    data: {
      title: 'Post'
    }
  },
  {
    path: ':post_id',
    component: AdminPostDetailComponent,
    data: {
      title: 'Post-detail'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPostRoutingModule {}
