import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../../services/loginservice.service';
import { AuthService } from '../../auth/auth.service';
import { ParameterserviceService } from '../../services/parameterservice/parameterservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  private peopleInfo:any={
    userName:'',
    userPass:''
  }

  private logindata:any={
    login:""
  };

  private api:string="";//http://127.0.0.1:8082/angular/angular/login
  //private verapi:string="";//http://127.0.0.1:8082/angular/angular/verlogin

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private loginser:LoginserviceService,
    private router:Router,
    private authser:AuthService,
    private par_uarl:ParameterserviceService,
    ) {}//
  
  ngOnInit(): void {
    //this.verapi = this.par_uarl.getAppUrl("/verlogin");
    this.api = this.par_uarl.getAppUrl("/login");

    /* this.loginser.verlogin(this.verapi).subscribe((data)=>{
      this.logindata = data;
      if(this.logindata.login=='true'){
        this.authser.login(true);
        this.router.navigate(['/menu']);
      }else{
        this.authser.login(false);
      }
    }); */
    

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    //console.log(this.validateForm.controls.userName.value);
    if(this.validateForm.controls.userName.value!=null){
      this.peopleInfo.userName = this.validateForm.controls.userName.value;
    }else{
      return;
    }
    if(this.validateForm.controls.password.value!=null){
      this.peopleInfo.userPass = this.validateForm.controls.password.value;
    }else{
      return;
    }

    

    this.loginser.getLogin(this.api,this.peopleInfo).subscribe((data)=>{
      this.logindata = data;
      //console.log(this.logindata);
      if(this.logindata.flag==true){
        this.authser.login(true);
        const modal = this.modal.success({
          nzTitle: '系统提示',
          nzContent: '登陆成功！'
        });
        
        setTimeout(() => modal.destroy(), 1500);
        this.router.navigate(['/menu']);
      }else{
        const modal = this.modal.warning({
          nzTitle: '系统提示',
          nzContent: '登陆失败请检查账号密码！'
        });
        setTimeout(() => modal.destroy(), 2000);
      }
    });
    
    
  }
  
}
