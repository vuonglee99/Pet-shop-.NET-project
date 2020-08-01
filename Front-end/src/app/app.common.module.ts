import { NgModule } from '@angular/core';
import { NgPrimeModule } from './app.ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { OwlModule } from 'ngx-owl-carousel'; 

@NgModule({
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        NgPrimeModule,
        FormsModule,
        ReactiveFormsModule,
        OwlModule
    ],
    declarations: [

    ]
})
export class AppCommonModule {

}