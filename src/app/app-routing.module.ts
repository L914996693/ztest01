import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { MenuComponent } from './components/menu/menu.component';


const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'login'},
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'menu',canActivate:[AuthGuard] ,data:{breadcrumb: '用户'},  //loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule)
    component:MenuComponent,
    children:[
      { path: 'userlist',canActivate:[AuthGuard] ,data:{breadcrumb: '用户列表'}, loadChildren: () => import('./components/menu/user/userlist/userlist.module').then(m => m.UserlistModule) }//canActivate:[AuthGuard] ,
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
