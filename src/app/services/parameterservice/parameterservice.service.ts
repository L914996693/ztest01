import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParameterserviceService {

  private overallSituation_url:string = 'http://192.168.1.107:8800';
  //private overallSituation_url:string = 'http://192.168.1.127:8082/agriculture';

  private user_key:string = '';

  private message:any='';

  private url_data:any={
    "/login":"/oauth/token",//登录接口
    "/loginOut":"/login/loginout",//登出接口
    "/rolelist":"/role/query",//角色列表查询
    "/usersave":"/user/addsave",//添加用户接口
    "/userupdate":"/user/editsave",//添加用户接口
    //"/verlogin":"/angular/angular/verlogin",
    "/anmenu":"/login/queryLeftMenu",//菜单接口
    "/userfindname":"/user/queryName",//查询用户接口
    "/userlist":"/consumer/userquery",//查询用户列表
    "/userfind":"/consumer/userfind",//修改用户-查询
    "/deluser":"/user/delete",//删除用户
    "/menufindurl":"/menu/queryUrl",//菜单地址校验接口
    "/menufinename":"/menu/queryName",//菜单名称校验接口
    "/menulist":"/menu/query",//菜单列表查询接口
    "/menufind":"/menu/getById",//修改菜单-查询
    "/menusave":"/menu/addsave",//添加菜单接口
    "/menuupdate":"/menu/editsave",//菜单修改接口
    "/delmenu":"/menu/delete",//菜单删除接口
    "/menufirstlist":"/menu/queryFirstMenu",//一级菜单接口

    //测试
    "/menu":"/consumer/menulist",
  };

  private tarurl:any={
    "用户列表":"",//this.router.navigate(['/userlist']),
  };

  constructor(
    private router: Router,
    private http: HttpClientModule,
    private httpclient: HttpClient,
  ) { }
  //获取Api路径
  getAppUrl(str:string){
    var data = this.overallSituation_url+this.url_data[str];
    return data;
  }

  //设置Token
  setUserKey(key:string,value){
    localStorage.setItem(key,JSON.stringify(value));
  }

  //获取Token
  getUserKey(key:string){
    return JSON.parse(localStorage.getItem(key));
  }

  //Get携带参数
  Parameter_Get(api:string,data:any){
    return new Observable((observer)=>{
        const params = new HttpParams({fromString: data});
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.get(api,{params}).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }
  
  //Post携带参数
  Parameter_Post(api:string,data:any){
    return new Observable((observer)=>{
      // post请求时需要额外设置请求头
      /* const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': "Bearer "+this.getUserKey('token'), }),//
        //,'withCredentials': 'true'
        }; */
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.post(api, data).subscribe(resp=>{//httpOptions
        observer.next(resp);
      })
    });
  }

  //Get不携带参数
  NoVal_Get(api:string){
    return new Observable((observer)=>{
        //const params = new HttpParams({fromString: data});
        /* const httpOptions = {
          headers: new HttpHeaders({ 'Authorization': "Bearer "+this.getUserKey('token'), }),
          //,'withCredentials': 'true'
          }; */
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.get(api).pipe(retry(0),catchError(this.handleError)).subscribe(resp=>{//httpOptions
        observer.next(resp);
      })
    });
  }

  //Post不携带参数
  NoVal_Post(api:string){
    return new Observable((observer)=>{
      // post请求时需要额外设置请求头
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        //,'withCredentials': 'true'
        };
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.post(api, null, httpOptions).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }

  errorMessage(str:any){
    return this.message;
  }

  private handleError(error: HttpErrorResponse) {
    //console.log(error)
    //console.log(ErrorEvent)
    //console.log(error.error)
    this.message = error.error.errorMsg
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

}
