import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { MenuComponent } from './components/menu/menu.component';


const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'login'},
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'menu',  //loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule),//canActivate:[AuthGuard] menum
    component:MenuComponent,
    //canActivate:[AuthGuard],
    children:[
      { path: 'user',data:{breadcrumb: '系统用户'} ,runGuardsAndResolvers: 'always', loadChildren: () => import('./components/menu/permissionsetting/user/user.module').then(m => m.UserModule) },//canActivate:[AuthGuard] ,
      { path: 'role',data:{breadcrumb: '系统角色'} ,runGuardsAndResolvers: 'always', loadChildren: () => import('./components/menu/permissionsetting/role/role.module').then(m => m.RoleModule) },//canActivate:[AuthGuard] ,
      { path: 'menum',data:{breadcrumb: '系统菜单'} ,runGuardsAndResolvers: 'always', loadChildren: () => import('./components/menu/permissionsetting/menum/menum.module').then(m => m.MenumModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, onSameUrlNavigation: 'reload' , enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
