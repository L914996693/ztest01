import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';

import { ParameterserviceService } from '../../../../services/parameterservice/parameterservice.service';
import { UserserviceService } from '../../../../services/permissionsetting/userservice.service';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[DatePipe]
})
export class UserComponent implements OnInit {
  isVisible = false;

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

  private userID:any={
    userId:''
  };

  private initialUserData:any={
    id:'testid',
    comment: "这是备注",
    confirm: "asdasd",
    email: "2590997646@qq.com",
    gender: "0",
    password: "asdasd",
    role: "3",
    userName: "test",
  }

  private userReData:any={};

  private userfindurl:string=this.par_url.getAppUrl('/userfindname');

  validateForm!: FormGroup;
  addUservalidateForm:  FormGroup;

  listOfData: ItemData[] = [];
  //displayData: ItemData[] = [];

  //当前页面展示数据改变的回调函数
  /* currentPageDataChange($event): void {
    //this.displayData = $event;
    //console.log($event);
  } */

  //页数改变时的回调函数
  pageSizeChange($event){
    this.userlist.pagesize = $event;
    //获取用户列表
    /* var userlist_url = this.par_url.getAppUrl('');
    this.usersv.getUserList(userlist_url,this.userlist).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        this.listOfData = this.userReData.data;
        //关闭弹出层并显示消息提示
      }else{
        //弹出失败消息提示-及原因
      }
    }); */
    //console.log(this.userlist);
  }

  //当前页码改变时的回调函数
  pageIndexChange($event){
    this.userlist.pageindex = $event;
    //获取用户列表
    /* var userlist_url = this.par_url.getAppUrl('');
    this.usersv.getUserList(userlist_url,this.userlist).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        this.listOfData = this.userReData.data;
        //关闭弹出层并显示消息提示
      }else{
        //弹出失败消息提示-及原因
      }
    }); */
    //console.log(this.userlist);
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
    /* for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    } */
  }

  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout?.value === 'inline';
  }

  generateData(): ItemData[] {
    const data = [];
    for (let i = 1; i <= 20; i++) {
      data.push({
        id:i,
        name: '1',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
    return data;
  }
//this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  constructor(private fb: FormBuilder,private par_url:ParameterserviceService,private usersv:UserserviceService,private datePipe:DatePipe) {
    this.addUservalidateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],//[this.userNameAsyncValidator]
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      comment: [''],
      gender: ['',[Validators.required]],
      role:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.listOfData = this.generateData();

    //获取用户列表
    /* var userlist_url = this.par_url.getAppUrl('');
    this.usersv.getUserList(userlist_url,this.userlist).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        //关闭弹出层并显示消息提示
      }else{
        //弹出失败消息提示-及原因
      }
    }); */
    this.validateForm = this.fb.group({
      userName: [null],
      rangePicker: [null]
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
  submitFormaddUser(value: { userName: string; email: string; password: string; confirm: string; comment: string ;role :string; gender: string;}): void {
    //console.log(value)
    this.initialUserData.userName = value.userName;
    this.initialUserData.password = value.password;
    this.initialUserData.confirm = value.confirm;
    this.initialUserData.comment = value.comment;
    this.initialUserData.email = value.email;
    this.initialUserData.gender = value.gender;
    this.initialUserData.role = value.role;

    console.log(this.initialUserData);
    //连接后端
    /* var userSaveOrUpdate_url = this.par_url.getAppUrl('');
    this.usersv.getAddUser(userSaveOrUpdate_url,this.initialUserData).subscribe((data)=>{
      this.userReData = data;
      if(this.userReData.flag==true){
        //关闭弹出层并显示消息提示
      }else{
        //弹出失败消息提示-及原因
      }
    }); */

     /* for (const key in this.addUservalidateForm.controls) {
      this.addUservalidateForm.controls[key].markAsDirty();
      this.addUservalidateForm.controls[key].updateValueAndValidity();
    }  */
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
      console.log("删除--用户ID--->"+userid)
    }

    //编辑--查看
    userFind(userid:string){
      //console.log("编辑--用户ID--->"+userid);
      //获取用户数据并反显
     /*  var finduser_url = this.par_url.getAppUrl('');
      this.userID.userId = userid;
      this.usersv.getUserFind(this.userfindurl,this.userID).subscribe((data)=>{
        this.userReData = data;
        if(this.userReData.flag==true){
          //显示弹出层并给--initialUserData赋值
        }else{
          //弹出消息提示
        }
      }); */

      //测试代码块
      this.addUservalidateForm.patchValue(
        {
          userName:this.initialUserData.userName,
          email:this.initialUserData.email,
          password:this.initialUserData.password,
          confirm:this.initialUserData.confirm,
          comment:this.initialUserData.comment,
          gender:this.initialUserData.gender,
          role:this.initialUserData.role,
        }
      )

      this.isVisible = true;

    }

    
}
