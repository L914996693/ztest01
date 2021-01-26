import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ParameterserviceService } from './parameterservice.service';

/**
 * 拦截器
 */
@Injectable()
export class NoopInterceptorInterceptor implements HttpInterceptor {

  constructor (
    private router: Router,
    private par_u: ParameterserviceService
    ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // 拦截请求,给请求头添加token
    let url = req.url // 可以对url进行处理
    console.log(url)
    let token = this.par_u.getUserKey('token')//document.cookie && document.cookie.split("=")[1]
    // 登录请求排除在外
    // if (!url.includes('login')) {
        req = req.clone({
            url, // 处理后的url,再赋值给req
            headers: req.headers.set('Authorization', "Bearer "+token)//请求头统一添加token
        })
    // }
    return next.handle(req).pipe(
        tap(
         event => {
          if (event instanceof HttpResponse) {
           console.log(event);
           if (event.status >= 500) {
            // 处理错误
           }
          }
         },
         error => {
          // token过期 服务器错误等处理
        //   this.router.navigate(['/login']);
         })
       );
  }
}