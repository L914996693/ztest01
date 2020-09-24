import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../auth/auth.guard';

import { UserlistComponent } from './userlist.component';

const routes: Routes = [
  { 
    path:'',data: {
      breadcrumb: '用户列表'
    },component:UserlistComponent,
    children:[
      //{ path: 'userlist',canActivate:[AuthGuard] ,data:{breadcrumb: 'Second'}, loadChildren: () => import('../../../../components/menu/user/userlist/userlist.module').then(m => m.UserlistModule) }//canActivate:[AuthGuard] ,
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserlistRoutingModule { }