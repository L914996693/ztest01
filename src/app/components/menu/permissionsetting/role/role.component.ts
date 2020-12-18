import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { RoleserviceService } from '../../../../services/permissionsetting/roleservice.service'
import { DatePipe } from '@angular/common';

import { ParameterserviceService } from '../../../../services/parameterservice/parameterservice.service';

interface ItemData {
  rolename: string;
  roleinfo: number | string;
  rolearay: any;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers:[DatePipe]
})
export class RoleComponent implements OnInit {
  //设置查询form
  roqvalidateForm!: FormGroup;
  //
  addRolevalidateForm:  FormGroup;
  //设置弹出层状态
  isVisible = false;

  //角色查询参数
  rolelist:any={
    createTime:[],
    roleName:'',
    total:20,
    pageindex:1,
    pagesize:10
  }

  //角色响应接收
  private roleReData:any={};

  //角色编辑缓存
  private initialRoleData:any={
    id:'testid',
    comment: "这是备注",
    confirm: "asdasd",
    email: "2590997646@qq.com",
    gender: "0",
    password: "asdasd",
    role: "3",
    userName: "test",
  }

  //角色名称缓存
  private roleName:any={
    roleName:''
  };

  //测试数据
  listOfData: ItemData[] = [];

  constructor(
    private fb: FormBuilder,
    private parutill: ParameterserviceService,
    private datePipe: DatePipe,
    private rolesev: RoleserviceService,
    ) { 
      //初始化新增角色role
      this.addRolevalidateForm = this.fb.group({
        roleName: ['', [Validators.required], [this.userNameAsyncValidator]],//[this.userNameAsyncValidator]
        gender: ['',[Validators.required]],
        comment: ['',[Validators.required]],
        role:['',[Validators.required]]
      });
     }

  ngOnInit(): void {
    //初始化查询条件
    this.roqvalidateForm = this.fb.group({
      roleName: [''],
      rangePicker: []
    });
    //装配数据
    this.listOfData = this.generateData();
  }

  //设置form样式
  get isHorizontal(): boolean {
    return this.roqvalidateForm.controls.formLayout?.value === 'inline';
  }

  //查询角色
  submitForm(): void {
    if(this.roqvalidateForm.value.rangePicker!=null){
      this.rolelist.createTime = this.roqvalidateForm.value.rangePicker
      for(let i=0;i<this.rolelist.createTime.length;i++){
        this.rolelist.createTime[i] = this.datePipe.transform(this.rolelist.createTime[i],"yyyy-MM-dd");
      }
    }
    if(this.rolelist.roleName!=null){
      this.rolelist.roleName = this.roqvalidateForm.value.roleName
    }else{
      this.rolelist.roleName = " ";
    }
    console.log(this.rolelist)
  }

  //重置参数
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.roqvalidateForm.reset();
    for (const key in this.roqvalidateForm.controls) {
      this.roqvalidateForm.controls[key].markAsPristine();
      this.roqvalidateForm.controls[key].updateValueAndValidity();
    }
  }

  //列表
  //页数改变时的回调函数
  pageSizeChange($event){
    this.rolelist.pagesize = $event;
    console.log(this.rolelist);
  }
  //当前页码改变时的回调函数
  pageIndexChange($event){
    this.rolelist.pageindex = $event;
    console.log(this.rolelist);
  }

  //编辑--查看
  roleFind(userid:string){
    console.log("编辑--角色ID--->"+userid)
  }

  //删除角色
  delRole(userid:string){
    console.log("删除--角色ID--->"+userid)
  }

  //制造假数据
  generateData(): ItemData[] {
    const data = [];
    for (let i = 1; i <= 20; i++) {
      data.push({
        id:i,
        rolename: '1',
        roleinfo: `New York No. ${i} Lake Park`,
      });
    }
    return data;
  }

  //弹出层
  adduser(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }
  handleCancel(): void {
    this.addRolevalidateForm.reset();
    for (const key in this.addRolevalidateForm.controls) {
      this.addRolevalidateForm.controls[key].markAsPristine();
      this.addRolevalidateForm.controls[key].updateValueAndValidity();
    }
    this.isVisible = false;
  }
  //校验用户名是否重复
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.roleName.roleName=control.value;
      setTimeout(() => {
        this.rolesev.getRoleFindName(this.parutill.getAppUrl(''),this.roleName).subscribe((data)=>{
          this.roleReData = data;
          if(this.roleReData.flag==false){
            observer.next({ error: true, duplicated: true });
          }else{
            observer.next(null);
          }
          observer.complete();
        });
      }, 1000);
    });

  //新增-修改用户form
  submitFormaddUser(value: { userName: string; email: string; password: string; confirm: string; comment: string ;role :string; gender: string;}): void {
    //console.log(value)
    /* this.initialUserData.userName = value.userName;
    this.initialUserData.password = value.password;
    this.initialUserData.confirm = value.confirm;
    this.initialUserData.comment = value.comment;
    this.initialUserData.email = value.email;
    this.initialUserData.gender = value.gender;
    this.initialUserData.role = value.role;

    console.log(this.initialUserData); */
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

}
