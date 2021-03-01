import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [],
  imports: [
    NgxEchartsModule.forRoot({
      echarts,
    }),
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
