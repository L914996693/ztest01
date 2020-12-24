import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClientModule,private httpclient:HttpClient) { }

  //校验重复用户
  getUserFindName(api:string,data:any){
    return new Observable((observer)=>{
      // post请求时需要额外设置请求头
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        //,'withCredentials': 'true'
        };
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.post(api, data, httpOptions).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }

  //获取用户列表
  getUserList(api:string,data:any){
    return new Observable((observer)=>{
      // post请求时需要额外设置请求头
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.post(api, data, httpOptions).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }

  //获取指定用户信息
  getUserFind(api:string,data:any){
    return new Observable((observer)=>{
        const params = new HttpParams({fromString: 'userId='+data});
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.get(api,{params}).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }

  //删除用户
  getUserDel(api:string,data:any){
    return new Observable((observer)=>{
        const params = new HttpParams({fromString: 'userId='+data});
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.get(api,{params}).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }

  //添加修改用户信息接口
  getAddUser(api:string,data:any){
    return new Observable((observer)=>{
      // post请求时需要额外设置请求头
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        //,'withCredentials': 'true'
        };
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.post(api, data, httpOptions).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }

  //获取角色列表
  getRoleList(api:string){
    return new Observable((observer)=>{
      // post请求时需要额外设置请求头
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.post(api, httpOptions).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }

}
