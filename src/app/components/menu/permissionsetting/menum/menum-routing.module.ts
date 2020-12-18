import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenumComponent } from './menum.component';


const routes: Routes = [
  { 
    path:'',data: {
      breadcrumb: '系统菜单'
    },component:MenumComponent,
    children:[
      //{ path: 'userlist',canActivate:[AuthGuard] ,data:{breadcrumb: 'Second'}, loadChildren: () => import('../../../../components/menu/user/userlist/userlist.module').then(m => m.UserlistModule) }//canActivate:[AuthGuard] ,
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenumRoutingModule { }
