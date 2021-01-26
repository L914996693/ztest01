import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../../services/loginservice.service';
import { AuthService } from '../../auth/auth.service';
import { ParameterserviceService } from '../../services/parameterservice/parameterservice.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  private peopleInfo:any={
    username:'',
    password:''
  }

  private logindata:any={
    login:""
  };

  private api:string="";

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private loginser:LoginserviceService,
    private router:Router,
    private authser:AuthService,
    private par_uarl:ParameterserviceService,
    private http:HttpClient
    ) {}//
  
  ngOnInit(): void {
    this.api = this.par_uarl.getAppUrl("/login");
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
    if(this.validateForm.controls.userName.value!=null){
      this.peopleInfo.username = this.validateForm.controls.userName.value;
    }else{
      return;
    }
    if(this.validateForm.controls.password.value!=null){
      this.peopleInfo.password = this.validateForm.controls.password.value;
    }else{
      return;
    }

    var username = this.validateForm.controls.userName.value;
    var password = this.validateForm.controls.password.value;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Credentials':'true'}),
      };
    this.http.post(this.api+"?client_id=finebo_agriculture&client_secret=123&grant_type=password&username="+username+"&password="+password,httpOptions).pipe().subscribe((res:any)=>{//,this.peopleInfo
      //console.log(res)
      if(res.token_type=='bearer'){
        this.par_uarl.setUserKey('token',res.access_token);
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
    })

    /* this.loginser.getLogin(this.api,this.peopleInfo).subscribe((data)=>{
      this.logindata = data;
      //console.log(this.logindata)
      if(this.logindata.success==true){
        console.log()
        this.par_uarl.setUserKey('token',this.logindata.data.token);
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
    }); */
    
    
  }
  
}
