import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { MenuComponent } from './components/menu/menu.component';


const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'login'},
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'menu',data:{breadcrumb: '用户'},  //loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule),canActivate:[AuthGuard] 
    component:MenuComponent,
    children:[
      { path: 'userlist',canActivate:[AuthGuard] ,data:{breadcrumb: '用户列表'}, loadChildren: () => import('./components/menu/user/userlist/userlist.module').then(m => m.UserlistModule) },//canActivate:[AuthGuard] ,
      { path: 'table',canActivate:[AuthGuard] ,data:{breadcrumb: '表格列表'}, loadChildren: () => import('./components/menu/table/table.module').then(m => m.TableModule) }//canActivate:[AuthGuard] ,
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, onSameUrlNavigation: 'reload' , enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
