import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzSelectModule
  ]
})
export class UserModule { }
