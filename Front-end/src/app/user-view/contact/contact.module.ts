import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import { HttpClientModule } from '@angular/common/http';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import {ContactRoutingModule} from './contact.routing';

@NgModule({
  imports: [
    ContactRoutingModule,
    AppCommonModule,
    BsDropdownModule,
    SpinnerOverlayModule,
    SharedModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    
  ],

  providers:[
    HttpClientModule
  ]
})
export class ContactModule { }
