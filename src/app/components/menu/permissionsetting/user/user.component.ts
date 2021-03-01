import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { DatePipe } from '@angular/common';
import { FiterCodeLengthPipePipe }  from '../../../../services/parameterservice/fiter-code-length-pipe.pipe';

import { ParameterserviceService } from '../../../../services/parameterservice/parameterservice.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TransferItem } from 'ng-zorro-antd/transfer';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[DatePipe]
})
export class UserComponent implements OnInit {
  isVisible = false;

  listOfData:any=[];

  //穿梭组件数据源集合
  translist: TransferItem[] = [];
  //穿梭组件已选择数据集合
  transarray:Array<String>=[];

  //分配角色弹窗状态
  disRoleisVisible = false;
  //分配角色提交按钮状态
  disRoledisabled:any='disabled';

  //加载状态
  isSpinning = false;
  
  genderlist: Array<{ userStateName: string; userStateId: any }> = [
    {
      userStateName:'启用',
      userStateId:1
    },
    {
      userStateName:'禁用',
      userStateId:0
    }
  ];

  validateForm!: FormGroup;

  addUservalidateForm:  FormGroup;

  //记录其他操作roleid
  private userId:string='';

  userlist:any={
    userName: "",
    createTime: [],
    total:20,
    pageindex:1,
    pagesize:10
  };

  private userName:any={
    userName:''
  };

  private initialUserDataid:string = '';

  private userReData:any={};

  private userfindurl:string=this.par_url.getAppUrl('/userfindname');

  //页数改变时的回调函数
  pageSizeChange($event){
    this.userlist.pagesize = $event;
    this.userFromList();
  }

  //当前页码改变时的回调函数
  pageIndexChange($event){
    this.userlist.pageindex = $event;
    this.userFromList();
  }

  submitForm(): void {
    if(this.validateForm.value.rangePicker!=null){
      this.userlist.createTime = this.validateForm.value.rangePicker
      for(let i=0;i<this.userlist.createTime.length;i++){
        this.userlist.createTime[i] = this.datePipe.transform(this.userlist.createTime[i],"yyyy-MM-dd");
      }
    }
    if(this.userlist.userName!=null){
      this.userlist.userName = this.validateForm.value.userName
    }else{
      this.userlist.userName = " ";
    }
    this.userFromList();
    /* for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    } */
  }

  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout?.value === 'inline';
  }

  constructor(
    private fb: FormBuilder,
    private par_url:ParameterserviceService,
    private datePipe:DatePipe,
    private message: NzMessageService,
    private http:HttpClient
    ) {
    this.addUservalidateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],//[this.userNameAsyncValidator]
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      userPhone : ['', [Validators.required], [this.validateUserPhone]],
      comment: [''],
      gender: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userFromList();
    this.validateForm = this.fb.group({
      userName: [null],
      rangePicker: [null]
    });
  }

  //获取用户列表
  userFromList(){
    this.par_url.Parameter_Post(this.par_url.getAppUrl('/userlist'),this.userlist).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        if(this.userReData.data==null){
          this.userlist.pageindex = 0;
          this.userlist.total = 0;
          this.listOfData = [];
        }else{
          this.userlist.pageindex = this.userReData.data.current == null? 0 : this.userReData.data.current;//当前页
          this.userlist.total = this.userReData.data.total == null? 0 : this.userReData.data.total;//总条目数
          this.listOfData = this.userReData.data.records == null? [] : this.userReData.data.records;//数据集
        }
      }else{
        //弹出失败消息提示-及原因
        this.userlist.pageindex = 0;
        this.userlist.total = 0;
        this.listOfData = [];
      }
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  adduser(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.addUservalidateForm.reset();
    for (const key in this.addUservalidateForm.controls) {
      this.addUservalidateForm.controls[key].markAsPristine();
      this.addUservalidateForm.controls[key].updateValueAndValidity();
    }
    this.isVisible = false;
  }

  //新增-修改用户form
  submitFormaddUser(value: { userName: string; email: string; password: string; confirm: string; comment: string ; gender: string; userPhone: string}): void {
    var userJson={
      userId : this.initialUserDataid,//id
      username : value.userName,//账号
      password : value.password,//用户密码
      userExplain : value.comment,//用户信息说明
      phoneNumber :value.userPhone,//电话
      email : value.email,//邮箱
      enabled : value.gender//禁用状态
    }
    if(value.userName == '' || value.password == ''  || value.userPhone == '' || value.email == '' || value.gender == '' || value.confirm == ''){
      this.message.create('warning', '请检查录入信息');
      return ;
    }
    //连接后端
    this.par_url.Parameter_Post(this.par_url.getAppUrl('/usersave'),userJson).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        //关闭弹出层并显示消息提示
        this.isVisible = false;
        for (const key in this.addUservalidateForm.controls) {
          this.addUservalidateForm.controls[key].markAsDirty();
          this.addUservalidateForm.controls[key].updateValueAndValidity();
        } 
        this.message.create('success', `编辑用户信息成功`);
        this.userFromList();
      }else{
        //弹出失败消息提示-及原因
        this.message.create('error', this.userReData.message);
      }
    });
  }

  /* resetFormaddUser(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.addUservalidateForm.controls) {
      this.addUservalidateForm.controls[key].markAsPristine();
      this.addUservalidateForm.controls[key].updateValueAndValidity();
    }
  } */

  validateConfirmPassword(): void {
    setTimeout(() => this.addUservalidateForm.controls.confirm.updateValueAndValidity());
  }

  //验证手机号
  validateUserPhone = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      var valid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;// 手机号码校验规则
      let phoneNumber = control.value;
      setTimeout(() => {
        if(!valid_rule.test(phoneNumber)){
          observer.next({ error: true, required: true });
          observer.complete();
        }else{
          observer.next(null);
          observer.complete();
        }
      }, 1000);
    });

  //校验用户名是否重复
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.userName.userName=control.value;
      setTimeout(() => {
        this.par_url.Parameter_Get(this.userfindurl,"username="+control.value).subscribe((data)=>{
          this.userReData = data;
          if(this.userReData.flag==false){
            observer.next({ error: true, duplicated: true });
          }else{
            observer.next(null);
          }
          observer.complete();
        });
      }, 1000);
    });

    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { error: true, required: true };
      } else if (control.value !== this.addUservalidateForm.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    };

    genderChange(value: string): void {
      //console.log(value)
      //this.addUservalidateForm
    }

    //删除用户
    delUser(userid:string){
      this.par_url.Parameter_Get(this.par_url.getAppUrl('/deluser'),"userid="+userid).subscribe((data)=>{
        this.userReData = data;
        if(this.userReData.flag==true){
          this.message.create('success', `删除用户信息成功`);
          this.userFromList();
        }else{

        }
      });
    }

    //编辑--查看
    userFind(userid:string){
      //获取用户数据并反显
      this.par_url.Parameter_Get(this.par_url.getAppUrl('/userfind'),'userid='+userid).subscribe((data)=>{
        this.userReData = data;
        if(this.userReData.flag==true){
          //显示弹出层并给--initialUserData赋值
          this.initialUserDataid = this.userReData.data.usergetone.userId;
          //测试代码块
          this.addUservalidateForm.patchValue(
            {
              userName:this.userReData.data.usergetone.username,
              userPhone:this.userReData.data.usergetone.phoneNumber,
              email:this.userReData.data.usergetone.email,
              password:this.userReData.data.usergetone.password,
              confirm:this.userReData.data.usergetone.password,
              comment:this.userReData.data.usergetone.userExplain,
              gender:this.userReData.data.usergetone.enabled,
            }
          )
          this.isVisible = true;
        }else{
          //弹出消息提示
        }
      });
    }


    //分配角色权限
    submitdisRole(){
      console.log(this.transarray)
      var rolu = {
        userid: this.userId,
        roleuserarray: this.transarray
      }
      this.par_url.Parameter_Post(this.par_url.getAppUrl('/roleusersub'),rolu).subscribe((data)=>{
        this.userReData = data;
        if(this.userReData.flag == true){
          this.message.create('success', this.userReData.message);
          //关闭弹出层
          this.disRoleisVisible = false;
        }else{
          this.message.create('error', this.userReData.message);
        }
      })
    }

    disRolehandleOk(): void {
      this.translist = [];
      this.disRoleisVisible = false;
      this.userId = '';
    }
    disRolehandleCancel(): void {//
      this.translist = [];
      this.disRoleisVisible = false;
      this.userId = '';
    }
    
    distuserrole(userId:string){
      this.userId = userId
      var rolu = {
        userid: this.userId
      }
      this.par_url.Parameter_Post(this.par_url.getAppUrl('/userroletrans'),rolu).subscribe((data)=>{
        this.userReData = data;
        if(this.userReData.flag ==true){
          this.translist = this.userReData.data;
          for(let i=0;i<this.userReData.data.length;i++){
            if(this.userReData.data[i].direction == 'right'){
              this.transarray.push(this.userReData.data[i].key);
            }
          }
          this.disRoleisVisible = true;
        }
      })
    }


    filterOption(inputValue: string, item: any): boolean {
      return item.title.indexOf(inputValue) > -1;
    }
  
    search(ret: {}): void {
      //console.log('nzSearchChange', ret);
    }
  
    select(ret: {}): void {
      //console.log('nzSelectChange', ret);
    }
  
    change(ret: {'from':'',list:[{'checked':'','direction':'','hide':'','title':'','key':''}],'to':''}): void {
      //this.transarray = [];
      if(ret.to.valueOf()=='right'){
        for(let i=0;i<ret.list.length;i++){
          this.transarray.push(ret.list[i].key)
        }
      }
      if(ret.to.valueOf()=='left'){
        for(let i=0;i<ret.list.length;i++){
          var indexval = this.transarray.indexOf(ret.list[i].key);
          this.transarray.splice(indexval,indexval);
        }
      }
      this.disRoledisabled = 'false';
    }

  

}
