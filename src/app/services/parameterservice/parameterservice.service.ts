import { Injectable } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParameterserviceService {

  private overallSituation_url:string = 'http://192.168.1.127:8082/agriculture';

  private user_key:string = '';

  private url_data:any={
    "/login":"/login/auth",
    //"/verlogin":"/angular/angular/verlogin",
    "/anmenu":"/login/queryLeftMenu"
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
