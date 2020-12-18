import { Component, Input, OnInit, Directive } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { MenuService } from '../../services/menu/menu.service';
import { ParameterserviceService } from '../../services/parameterservice/parameterservice.service';
import { LoginserviceService } from '../../services/loginservice.service';

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
    private menus:MenuService,
    private par_uarl:ParameterserviceService,
    private loginsev:LoginserviceService,
    private message: NzMessageService,
  ){}

  ngOnInit(): void {
    this.menuapi = this.par_uarl.getAppUrl("/anmenu");
    this.data.uuid = this.par_uarl.getUserKey('uuid');
    this.menus.getmenu(this.menuapi,this.data).subscribe((data)=>{
      this.menudata = data;
      if(this.menudata.flag==true){
        this.menulist = this.menudata.data;
      }
    });
    
  }

  loginOut(){
    this.createMessage('success');
    /* var loginout_api = this.par_uarl.getAppUrl('');
    this.loginsev.logOut(loginout_api,this.par_uarl.getUserKey('uuid')).subscribe((data)=>{
      this.logOutdata = data;
      if(this.logOutdata.flag==true){
        this.createMessage('success');
        this.router.navigate(['/login']);
      }else{
        this.createMessage('error');
      }
    }); */
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
}
