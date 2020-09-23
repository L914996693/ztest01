import { Component, Input, OnInit, Directive } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';

import { MenuService } from '../../services/menu/menu.service';
import { ParameterserviceService } from '../../services/parameterservice/parameterservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  
  isCollapsed = false;

  private menuapi:string="";

  private menudata:any={
    result:"",
    message:"",
    data:""
  };

  public menulist:any={};

  constructor(
    private router:Router,
    private menus:MenuService,
    private par_uarl:ParameterserviceService,
  ){}

  ngOnInit(): void {
    this.menuapi = this.par_uarl.getAppUrl("/anmenu");
    this.menus.getmenu(this.menuapi).subscribe((data)=>{
      this.menudata = data;
      if(this.menudata.result=='true'){
        this.menulist = this.menudata.data;
      }
    });
    
  }
  
  menuclick(e){
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
  }
}
