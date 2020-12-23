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
    "/usersave":"/user/addsave",//
    //"/verlogin":"/angular/angular/verlogin",
    "/anmenu":"/login/queryLeftMenu",//菜单接口
    "/userfindname":"/user/queryName",//查询用户接口
    "/userlist":"/user/query",//查询用户列表
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
