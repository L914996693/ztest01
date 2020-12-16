import { Component } from '@angular/core';
import { AuthService } from '../app/auth/auth.service';
import { Router,NavigationExtras } from '@angular/router';
import { LoginserviceService } from '../app/services/loginservice.service';
import { ParameterserviceService } from '../app/services/parameterservice/parameterservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ztest01';

  private verapi:string="";
  private logindata:any={
    login:""
  };

  constructor(
    private par_uarl:ParameterserviceService,
    private router:Router,
    private authser:AuthService,
    private loginser:LoginserviceService
    ){}

  ngOnInit(): void {
    /* this.verapi = this.par_uarl.getAppUrl("/verlogin");
    this.loginser.verlogin(this.verapi).subscribe((data)=>{
      this.logindata = data;
      if(this.logindata.login=='true'){
        this.authser.login(true);
        this.router.navigate(['/menu']);
      }else{
        this.authser.login(false);
      }
    }); */
  }
}

