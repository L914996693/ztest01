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
  //private overallSituation_url:string = 'http://192.168.1.110:8800';
  //private overallSituation_url:string = 'http://192.168.1.127:8082/agriculture';

  private user_key:string = '';

  private message:any='';

  private url_data:any={
    "/login":"/oauth/token",//登录接口
    "/loginOut":"/login/loginout",//登出接口
    "/rolelist":"/consumer/rolequery",//角色列表查询
    "/usersave":"/consumer/useradd",//添加用户接口
    "/userupdate":"/user/editsave",//添加用户接口
    //"/verlogin":"/angular/angular/verlogin",
    "/menu":"/consumer/menulist",//菜单接口
    "/userfindname":"/consumer/usercheckrepeat",//查询用户接口
    "/userlist":"/consumer/userquery",//查询用户列表
    "/userfind":"/consumer/userfind",//修改用户-查询
    "/userroletrans":"/consumer/disroleuser",//用户-分配角色-获取全部角色
    "/roleusersub":"/consumer/disroleusersub",//用户-分配角色-提交
    "/deluser":"/consumer/userdelete",//删除用户
    "/menufindurl":"/consumer/menuurlcheckrepeat",//菜单地址校验接口
    "/menufinename":"/consumer/menucheckrepeat",//菜单名称校验接口
    "/menulist":"/consumer/menuquery",//菜单列表查询接口
    "/menufind":"/consumer/menufind",//修改菜单-查询
    "/menusave":"/consumer/menuadd",//添加菜单接口
    "/menuupdate":"/menu/editsave",//菜单修改接口
    "/delmenu":"/consumer/menudelete",//菜单删除接口
    "/menufirstlist":"/consumer/firstquery",//一级菜单接口
    "/menuroletreelist":"/consumer/rmenutree",//角色功能-分配菜单-获取全部菜单树
    "/menuroletreesub":"/consumer/rmenudistrib",//角色功能-分配菜单-提交
    "/roleaddmod":"/consumer/roleadd",//角色新增&修改接口
    "/roledel":"/consumer/roledelete",//角色删除
    "/rolefind":"/consumer/rolefind",//角色编辑查询
    "/rpermissionsub":"/consumer/rpermissionsave",//角色功能--分配权限-提交
    "/rolename":"/consumer/rolecheckrepeat",//角色功能-新增角色-角色名称查重
    "/roletranslist":"/consumer/rpermission",//角色功能--分配权限--获取穿梭框数据

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

  //删除Token
  deltUserKey(key:string){
    localStorage.removeItem(key);
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
