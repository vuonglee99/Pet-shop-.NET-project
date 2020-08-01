import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthGuard } from '../app/core/gaurds/auth.gaurd';
import { HttpClientModule } from '@angular/common/http';
import {Admin} from './core/gaurds/admin';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {AppCommonModule} from './app.common.module';
import { UserIdleModule } from 'angular-user-idle';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import {UsersService,CategoriesService} from './shared/service-proxy.module';
import {SpinnerOverlayModule} from '../app/core/spinner/spinner-overlay.module';
import {SharedModule} from '../app/core/spinner/shared.module';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    AppCommonModule,
    HttpClientModule,
    SpinnerOverlayModule,
    SharedModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    CommonModule,
    UserIdleModule.forRoot({ idle: 300, timeout: 1, ping: null }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
    
  },
    AuthGuard,
    MessageService,
    UsersService,
    DialogService,
    ConfirmationService,
    Admin,
    CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
