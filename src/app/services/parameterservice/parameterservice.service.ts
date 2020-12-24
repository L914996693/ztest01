import { Injectable } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParameterserviceService {

  private overallSituation_url:string = 'http://192.168.1.127:8082/agriculture';

  private user_key:string = '';

  private url_data:any={
    "/login":"/login/auth",//登录接口
    "/loginOut":"/login/loginout",//登出接口
    "/rolelist":"/role/query",//角色列表查询
    "/usersave":"/user/addsave",//添加用户接口
    "/userupdate":"/user/editsave",//添加用户接口
    //"/verlogin":"/angular/angular/verlogin",
    "/anmenu":"/login/queryLeftMenu",//菜单接口
    "/userfindname":"/user/queryName",//查询用户接口
    "/userlist":"/user/query",//查询用户列表
    "/userfind":"/user/getById",//修改用户-查询
    "/deluser":"/user/delete",//删除用户
    "/menufindurl":"/menu/queryUrl",//菜单地址校验接口
    "/menufinename":"/menu/queryName",//菜单名称校验接口
    "/menulist":"/menu/query",//菜单列表查询接口
    "/menufind":"/menu/getById",//修改菜单-查询
    "/menusave":"/menu/addsave",//添加菜单接口
    "/menuupdate":"/menu/editsave",//菜单修改接口
    "/delmenu":"/menu/delete",//菜单删除接口
    "/menufirstlist":"/menu/queryFirstMenu",//一级菜单接口
  };

  private tarurl:any={
    "用户列表":"",//this.router.navigate(['/userlist']),
  };

  constructor(
    private router:Router,
  ) { }
  getAppUrl(str:string){
    var data = this.overallSituation_url+this.url_data[str];
    return data;
  }

  setUserKey(key:string,value){
    localStorage.setItem(key,JSON.stringify(value));
  }

  getUserKey(key:string){
    return JSON.parse(localStorage.getItem(key));
  }

}
