import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { 
    path:'',data: {
      breadcrumb: '首页'
    },component:HomeComponent,
    children:[
      //{ path: 'userlist',canActivate:[AuthGuard] ,data:{breadcrumb: 'Second'}, loadChildren: () => import('../../../../components/menu/user/userlist/userlist.module').then(m => m.UserlistModule) }//canActivate:[AuthGuard] ,
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
