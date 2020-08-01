import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {AppCommonModule} from '../../app.common.module';
import {ProductsService,CategoriesService,CommentsService} from '../../shared/service-proxy.module';
import { HttpClientModule } from '@angular/common/http';
import {AdminProductRoutingModule} from './admin-product.routing';
import {AdminProductComponent} from './admin-product.component';
import {SpinnerOverlayModule} from '../../core/spinner/spinner-overlay.module';
import {SharedModule} from '../../core/spinner/shared.module';
import {AdminProductDetailComponent} from './admin-product-detail/admin-product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AdminProductAddComponent} from './admin-product-add/admin-product-add.component';
import {AdminCateAddComponent} from './cate-add/cate-add.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    AdminProductRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SpinnerOverlayModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminProductComponent,
    AdminProductDetailComponent,
    AdminProductAddComponent,
    AdminCateAddComponent
  ],
  providers:[
    ProductsService,
    HttpClientModule,
    CategoriesService,
    CommentsService
  ]
})
export class AdminProductModule { }
