import { Component, Input, OnInit, Directive } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../auth/auth.service';

import { ParameterserviceService } from '../../services/parameterservice/parameterservice.service';
import { LoginserviceService } from '../../services/loginservice.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  
  isCollapsed = false;

  private menuapi:string="";

  private data:any = {
    uuid:''
  };

  private menudata:any={
    result:"",
    message:"",
    data:""
  };

  private logOutdata:any={
    result:"",
    message:"",
    data:""
  };

  public menulist:any=[];

  constructor(
    private router:Router,
    private par_uarl:ParameterserviceService,
    private loginsev:LoginserviceService,
    private message: NzMessageService,
    private authser:AuthService,
    private http:HttpClient
  ){}

  ngOnInit(): void {
    this.menuapi = this.par_uarl.getAppUrl("/menu");
    //this.data.uuid = this.par_uarl.getUserKey('uuid');
    /* const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer "+this.par_uarl.getUserKey('token'),'Access-Control-Allow-Credentials':'true'}),
      };
    this.http.get(this.menuapi,httpOptions).pipe(catchError(this.handleError)).subscribe((res:any)=>{
      console.log(res)
      if(res.flag==true){
        this.message.create('success', '登陆成功');
        this.menulist = res.data;
      }else{
        this.message.create('error', '登陆失败');
      }
    }); */
    this.par_uarl.NoVal_Get(this.menuapi).subscribe((data)=>{//,this.data
      console.log(data)
      this.menudata = data;
      if(this.menudata.flag==true){
        this.menulist = this.menudata.data;
      }
    });
    
    
  }

  loginOut(){
    //this.createMessage('success');
    var loginout_api = this.par_uarl.getAppUrl('/loginOut');
    this.loginsev.logOut(loginout_api,this.par_uarl.getUserKey('uuid')).subscribe((data)=>{
      this.logOutdata = data;
      if(this.logOutdata.flag==true){
        this.authser.login(false);
        this.createMessage('success');
        this.router.navigate(['/login']);
      }else{
        this.createMessage('error');
      }
    });
  }

  createMessage(type: string): void {
    switch (type) {
      case "success":
        this.message.create(type, `退出成功返回登录`);
        break;
      case "error":
        this.message.create(type, `退出登录失败`);
        break;
      case "warning":
        this.message.create(type, `警告`);
        break;
    }
  }
  /* menuclick(e){
    switch (e.toElement.innerText) {
      case "用户列表":
          //console.log(e.toElement.innerText)
          this.router.navigate(['/menu/userlist']);
          break;
      case "新增用户":
          //console.log(e.toElement.innerText)
          this.router.navigate(['/menu']);
          break;
      case 3:
          this.router.navigate(['/menu']);
          break; 
    }
    //console.log(e.toElement.innerText);
  } */

  private handleError(error: HttpErrorResponse) {
    //console.log(error)
    //console.log(ErrorEvent)
    //console.log(error.error)
    //console.log(error.error.errorMsg);
    //alert(error.error.errorMsg)
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
