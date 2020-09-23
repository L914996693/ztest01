import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http:HttpClientModule,
    private httpclient:HttpClient
  ) { }

  getmenu(api:string){
    //console.log("login service")
    return new Observable((observer)=>{
      // post请求时需要额外设置请求头
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        //,'withCredentials': 'true'
        };
      // 默认接收json的返回值，返回字符串时报错
      this.httpclient.post(api, httpOptions).subscribe(resp=>{
        observer.next(resp);
      })
    });
    
  }
}
