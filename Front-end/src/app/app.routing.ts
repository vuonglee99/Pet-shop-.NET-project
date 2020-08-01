import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from '../app/core/gaurds/auth.gaurd';
import {Role} from  '../app/core/gaurds/role';
import {Admin} from '../app/core/gaurds/admin';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[Admin],
        data:{roles:[Role.Admin]}
      },
      {
        path: 'admin/user',
        loadChildren: () => import('./views/admin-user/admin-user.module').then(m => m.AdminUserModule),
        canActivate:[Admin],
        data:{roles:[Role.Admin]}
      },
      {
        path: 'admin/product',
        loadChildren: () => import('./views/product/admin-product.module').then(m => m.AdminProductModule),
        canActivate:[Admin],
        data:{roles:[Role.Admin]}
      },
      {
        path: 'admin/order',
        loadChildren: () => import('./views/admin-order/admin-order.module').then(m => m.AdminOrderModule),
        canActivate:[Admin],
        data:{roles:[Role.Admin]}
      },
      {
        path: 'admin/post',
        loadChildren: () => import('./views/admin-post/admin-post.module').then(m => m.AdminPostModule),
        canActivate:[Admin],
        data:{roles:[Role.Admin]}
      },
      {
        path: 'admin/news',
        loadChildren: () => import('./views/admin-news/admin-news.module').then(m => m.AdminNewsModule),
        canActivate:[Admin],
        data:{roles:[Role.Admin]}
      },
      {
        path: 'admin/contact',
        loadChildren: () => import('./views/admin-contact/admin-contact.module').then(m => m.AdminContactModule),
        canActivate:[Admin],
        data:{roles:[Role.Admin]}
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./user-view/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
        canActivate:[AuthGuard],
        data:{roles:[Role.User]}
      },
      {
        path:'post',
        loadChildren: () => import('./user-view/post/post.module').then(m => m.PostModule),
        canActivate:[AuthGuard],
        data:{roles:[Role.User]}
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
