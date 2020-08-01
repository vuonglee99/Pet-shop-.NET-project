import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from './spinner.module';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
  ],
  declarations: [
],
  exports: [

  SpinnerModule, 
]
})
export class SharedModule { }