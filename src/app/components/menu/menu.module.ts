import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconService } from 'ng-zorro-antd/icon';

import { MenuRoutingModule } from './menu-routing.module';
import { UserlistComponent } from './user/userlist/userlist.component';
import { TableComponent } from './table/table.component';
import { UserComponent } from './permissionsetting/user/user.component';
import { RoleComponent } from './permissionsetting/role/role.component';
import { MenumComponent } from './permissionsetting/menum/menum.component';


@NgModule({
  declarations: [UserlistComponent, TableComponent, UserComponent, RoleComponent, MenumComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule {
  constructor(private iconService: NzIconService){
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }
}
