import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { UserlistComponent } from './user/userlist/userlist.component';


@NgModule({
  declarations: [UserlistComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule {
}
