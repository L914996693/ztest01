import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { DatePipe } from '@angular/common';

import { ParameterserviceService } from '../../../../services/parameterservice/parameterservice.service';
import { UserserviceService } from '../../../../services/permissionsetting/userservice.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[DatePipe]
})
export class UserComponent implements OnInit {
  isVisible = false;

  listOfData:any=[];

  rolelist: Array<{ roleName: string; roleId: string }> = [];
  
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

  //genderstate : 0;

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

  validateForm!: FormGroup;
  addUservalidateForm:  FormGroup;

  //displayData: ItemData[] = [];

  //当前页面展示数据改变的回调函数
  /* currentPageDataChange($event): void {
    //this.displayData = $event;
    //console.log($event);
  } */

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
    private usersv:UserserviceService,
    private datePipe:DatePipe,
    private message: NzMessageService,
    ) {
    this.addUservalidateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],//[this.userNameAsyncValidator]
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      userPhone : ['', [Validators.required], [this.validateUserPhone]],
      comment: [''],
      gender: ['',[Validators.required]],
      role:['',[Validators.required]]
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
    
    this.usersv.getUserList(this.par_url.getAppUrl('/userlist'),this.userlist).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        if(this.userReData.data==null){
          this.userlist.pageindex = 0;
          this.userlist.total = 0;
          this.listOfData = [];
        }else{
          this.userlist.pageindex = this.userReData.data.pageNum == null? 0 : this.userReData.data.pageNum;//当前页
          this.userlist.total = this.userReData.data.total == null? 0 : this.userReData.data.total;//总条目数
          this.listOfData = this.userReData.data.list == null? [] : this.userReData.data.list;//数据集
        }
      }else{
        //弹出失败消息提示-及原因
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
    this.getRolelist();
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
  submitFormaddUser(value: { userName: string; email: string; password: string; confirm: string; comment: string ;role :string; gender: string; userPhone: string}): void {
    var userJson={
      userId : this.initialUserDataid,//id
      userName : value.userName,//账号
      userPass : value.password,//用户密码
      nickName : value.userName,//用户名称
      userInfo : value.comment,//用户信息说明
      roleId : value.role,//角色id
      userPhone :value.userPhone,//电话
      userEmail : value.email,//邮箱
      userState : value.gender//禁用状态
    }
    console.log(value.userName)
    if(value.userName == '' || value.password == '' || value.role == '' || value.userPhone == '' || value.email == '' || value.gender == '' || value.confirm == ''){
      this.message.create('error', `请检查录入信息`);
      return ;
    }
    //连接后端
    this.usersv.getAddUser(this.par_url.getAppUrl('/usersave'),userJson).subscribe((data)=>{
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
      //console.log(phoneNumber)
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
        this.usersv.getUserFindName(this.userfindurl,this.userName).subscribe((data)=>{
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

    roleChange(value: string){
      //console.log(value)
    }

    //删除用户
    delUser(userid:string){
      this.usersv.getUserDel(this.par_url.getAppUrl('/deluser'),userid).subscribe((data)=>{
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
      this.usersv.getUserFind(this.par_url.getAppUrl('/userfind'),userid).subscribe((data)=>{
        this.userReData = data;
        if(this.userReData.flag==true){
          this.getRolelist();
          //显示弹出层并给--initialUserData赋值
          this.initialUserDataid = this.userReData.data.userId;
          //测试代码块
          this.addUservalidateForm.patchValue(
            {
              userName:this.userReData.data.userName,
              userPhone:this.userReData.data.userPhone,
              email:this.userReData.data.userEmail,
              password:this.userReData.data.userPass,
              confirm:this.userReData.data.userPass,
              comment:this.userReData.data.userInfo,
              gender:this.userReData.data.userState,
              role:this.userReData.data.roleId, 
            }
          )
          this.isVisible = true;
        }else{
          //弹出消息提示
        }
      });
    }

  //获取角色列表
  getRolelist(){
    this.usersv.getRoleList(this.par_url.getAppUrl('/rolelist')).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        for(let i = 0;i<this.userReData.data.length;i++){
          this.rolelist.push({roleName : this.userReData.data[i].roleName,roleId : this.userReData.data[i].roleId});
        }
        //this.rolelist = this.userReData.data;
        //关闭弹出层并显示消息提示
      }else{
        //弹出失败消息提示-及原因
      }
    });
  }


}
