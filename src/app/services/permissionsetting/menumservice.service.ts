import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenumserviceService {

  constructor(
    private http:HttpClientModule,
    private httpclient:HttpClient
  ) { }

  //校验重复菜单--名称&地址
  getMenu(api:string,data:any){
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

  //Get用户
  getMenuGet(api:string,data:any){
    return new Observable((observer)=>{
        const params = new HttpParams({fromString: data});
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.get(api,{params}).subscribe(resp=>{
        observer.next(resp);
      })
    });
  }
}
