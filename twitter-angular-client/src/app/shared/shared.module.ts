import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3CloudComponent } from './d3-cloud/d3-cloud.component';
@NgModule({
  declarations: [
    D3CloudComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    D3CloudComponent
  ]
})
export class SharedModule { }
