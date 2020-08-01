import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {UsersService,ContactsService} from '../../shared/service-proxy.module';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import { CommonModule } from '@angular/common';
import {AdminContactRoutingModule} from './admin-contact.routing';
import { AdminContactComponent} from './admin-contact.component' ;
import {AdminContactDetailComponent} from './admin-contact-detail/admin-contact-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SpinnerOverlayModule,
    SharedModule,
    AdminContactRoutingModule,
    
  ],
  declarations: [
    AdminContactComponent,
    AdminContactDetailComponent
  ],
  providers:[
    UsersService,
    HttpClientModule,
    ContactsService
  ]
})
export class AdminContactModule { }
