import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';

import { MenuComponent } from './menu.component';

const routes: Routes = [
  { 
    path:'',data: {
      breadcrumb: '用户'
    },component:MenuComponent,
    /* children:[
      { path: 'userlist',canActivate:[AuthGuard] ,data:{breadcrumb: 'Second'}, loadChildren: () => import('../userlist/userlist.module').then(m => m.UserlistModule) }//canActivate:[AuthGuard] ,
    ]  */
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
