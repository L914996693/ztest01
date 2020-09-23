import { Injectable } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParameterserviceService {

  private url_data:any={
    "/login":"/angular/angular/login",
    "/verlogin":"/angular/angular/verlogin",
    "/anmenu":"/angular/anmenu/menulist"
  };

  private tarurl:any={
    "用户列表":"",//this.router.navigate(['/userlist']),
  };

  constructor(
    private router:Router,
  ) { }
  getAppUrl(str:string){
    var data = this.url_data[str];
    return data;
  }
  
}
