import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { UserlistComponent } from './user/userlist/userlist.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [UserlistComponent, TableComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule {
}
