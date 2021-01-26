import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { DatePipe } from '@angular/common';

import { ParameterserviceService } from '../../../../services/parameterservice/parameterservice.service';

@Component({
  selector: 'app-menum',
  templateUrl: './menum.component.html',
  styleUrls: ['./menum.component.scss'],
  providers:[DatePipe]
})
export class MenumComponent implements OnInit {
  //弹出层显示状态
  isVisible = false;

  //查询表单设置
  menuvalidateForm!: FormGroup;
  //编辑表单设置
  addEditvalidateForm:  FormGroup;

  //查询参数设置
  menulist:any={
    menuName: "",
    createTime: [],
    total:20,
    pageindex:1,
    pagesize:10
  };

  //菜单ID
  private initialUserDataid = "";

  //菜单名称
  private menuName:any={
    menuName:''
  };

  //菜单地址
  private menuUrl:any={
    menuUrl:''
  };

  //菜单列表数据集合
  listOfData:any=[];

  //设置菜单等级下拉
  genderlist: Array<{ menuLeveName: string; menuLeveId: any }> = [
    {
      menuLeveName:'一级菜单',
      menuLeveId:1
    },
    {
      menuLeveName:'二级菜单',
      menuLeveId:2
    }
    
  ];

  //菜单归属下拉设置
  genderAscription: Array<{ menuName: string; menuId: any }> = [];

  //响应接收
  private menuRsData:any={};

  //声明
  constructor(
    private fb: FormBuilder,
    private par_url: ParameterserviceService,
    private datePipe: DatePipe,
    private message: NzMessageService,
  ) { 
    //弹出新增表单初始化
    this.addEditvalidateForm = this.fb.group({
      menuName: ['', [Validators.required], [this.menuNameAsyncValidator]],
      menuUrl: ['', [Validators.required], [this.menuUrlAsyncValidator]],
      gender: ['',[Validators.required]],
      genderascription: ['',[Validators.required]],
      comment: [''],
    });
   }

  //生命周期初始化
  ngOnInit(): void {
    //菜单列表
    this.getMenuList();
    //初始化查询表单
    this.menuvalidateForm = this.fb.group({
      menuName: [null],
      rangePicker: [null]
    });
  }

  //表单设置
  get isHorizontal(): boolean {
    return this.menuvalidateForm.controls.formLayout?.value === 'inline';
  }

  //菜单查询--开始
  //提交查询
  menusubmitForm(): void {
    if(this.menuvalidateForm.value.rangePicker!=null){
      this.menulist.createTime = this.menuvalidateForm.value.rangePicker
      for(let i=0;i<this.menulist.createTime.length;i++){
        this.menulist.createTime[i] = this.datePipe.transform(this.menulist.createTime[i],"yyyy-MM-dd");
      }
    }
    if(this.menulist.menuName!=null){
      this.menulist.menuName = this.menuvalidateForm.value.menuName
    }else{
      this.menulist.menuName = " ";
    }
    this.getMenuList();
  }

  //查询重置
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.menuvalidateForm.reset();
    for (const key in this.menuvalidateForm.controls) {
      this.menuvalidateForm.controls[key].markAsPristine();
      this.menuvalidateForm.controls[key].updateValueAndValidity();
    }
  }

  //菜单查询--结束

  //添加菜单按钮--开始
  addmenu(): void {
    this.isVisible = true;
    this.getFirstMenuList();
  }

  handleOk(): void {
    this.isVisible = false;
    this.genderAscription = [];
  }

  handleCancel(): void {
    this.addEditvalidateForm.reset();
    for (const key in this.addEditvalidateForm.controls) {
      this.addEditvalidateForm.controls[key].markAsPristine();
      this.addEditvalidateForm.controls[key].updateValueAndValidity();
    }
    this.isVisible = false;
    this.initialUserDataid = '';
    this.genderAscription = [];
  }
  //添加菜单按钮--结束

  //table渲染--开始
  //页数改变时的回调函数
  pageSizeChange($event){
    this.menulist.pagesize = $event;
    //菜单列表
    this.getMenuList();
    //console.log(this.menulist);
  }
  //当前页码改变时的回调函数
  pageIndexChange($event){
    this.menulist.pageindex = $event;
    //菜单列表
    this.getMenuList();
    //console.log(this.menulist);
  }

  //菜单编辑按钮
  menuFind(menuid:string){
    this.par_url.Parameter_Get(this.par_url.getAppUrl('/menufind'),'menuId='+menuid).subscribe((data)=>{
      this.menuRsData = data;
      if(this.menuRsData.flag==true){
        //获取的编辑菜单ID
        this.initialUserDataid = this.menuRsData.data.menuId;
        this.addEditvalidateForm.patchValue(
          {
            menuName:this.menuRsData.data.menuName,
            menuUrl:this.menuRsData.data.menuUrl,
            comment:this.menuRsData.data.menuInfo,
            genderascription:this.menuRsData.data.menuPid,
            gender:this.menuRsData.data.menuLevel
          }
        )
        this.isVisible = true;
        this.getFirstMenuList();
      }else{

      }
    });
  }

  //删除菜单按钮
  delMenu(menuid:string){
    this.par_url.Parameter_Get(this.par_url.getAppUrl('/delmenu'),'menuId='+menuid).subscribe((data)=>{
      this.menuRsData = data;
      if(this.menuRsData.flag==true){
        this.message.create('success', `删除菜单信息成功`);
        this.getMenuList();
      }else{

      }
    });
  }

  //提交-新增&修改
  submitFormaddEdit(value: { menuName: string; menuUrl: string; comment: string; gender: any; genderascription: any}):void{
    var menu_json = {
      menuId: this.initialUserDataid,
      menuName: value.menuName,
      menuUrl: value.menuUrl,
      menuInfo: value.comment,
    };
    if(value.gender == 2){
      if(value.genderascription == ''){
        this.message.create('error', `请检查菜单归属项`);
        return ;
      }
      if(value.menuUrl == ''){
        this.message.create('error', `请检查菜单地址`);
        return ;
      }
    }
    if(value.gender == 1){
      var flag = 1;
      if(value.menuUrl == null){
        flag = 0;
      }
      if(value.menuUrl == ''){
        flag = 0;
      }
      if(flag != 0 ){
        this.message.create('error', `请删除菜单地址`);
        return ;
      }
      console.log(value.genderascription)
      if(value.genderascription != ''){
        this.message.create('error', `请删除菜单归属`);
        return ;
      }
    }
    if(value.menuName == null || value.menuName == ''){
      this.message.create('error', `请检查录入信息`);
      return ;
    }
    //判断ID是否存在
    if(this.initialUserDataid == ""){//添加
      this.par_url.Parameter_Post(this.par_url.getAppUrl('/menusave'),menu_json).subscribe((data)=>{
        this.menuRsData = data;
        if(this.menuRsData.flag==true){
          for (const key in this.addEditvalidateForm.controls) {
            this.addEditvalidateForm.controls[key].markAsDirty();
            this.addEditvalidateForm.controls[key].updateValueAndValidity();
          } 
          //关闭弹出层并显示消息提示
          this.isVisible = false;
          this.message.create('success', `编辑用户信息成功`);
          this.getMenuList();
          this.addEditvalidateForm.reset();
          this.genderAscription = [];
        }else{

        }
      });
    }else{//修改
      this.par_url.Parameter_Post(this.par_url.getAppUrl('/menuupdate'),menu_json).subscribe((data)=>{
        this.menuRsData = data;
        if(this.menuRsData.flag==true){
          for (const key in this.addEditvalidateForm.controls) {
            this.addEditvalidateForm.controls[key].markAsDirty();
            this.addEditvalidateForm.controls[key].updateValueAndValidity();
          } 
          //关闭弹出层并显示消息提示
          this.isVisible = false;
          this.message.create('success', `编辑用户信息成功`);
          this.getMenuList();
          this.initialUserDataid = '';
          this.addEditvalidateForm.reset();
          this.genderAscription = [];
        }else{

        }
      });
    }
  }

  //校验菜单名称
  menuNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.menuName.menuName=control.value;
      setTimeout(() => {
        this.par_url.Parameter_Post(this.par_url.getAppUrl('/menufinename'),this.menuName).subscribe((data)=>{
          this.menuRsData = data;
          if(this.menuRsData.flag==false){
            observer.next({ error: true, duplicated: true });
          }else{
            observer.next(null);
          }
          observer.complete();
        });
      }, 1000);
    });

  //校验菜单地址
  menuUrlAsyncValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {
    this.menuUrl.menuUrl=control.value;
    setTimeout(() => {
      this.par_url.Parameter_Post(this.par_url.getAppUrl('/menufindurl'),this.menuUrl).subscribe((data)=>{
        this.menuRsData = data;
        if(this.menuRsData.flag==false){
          observer.next({ error: true, duplicated: true });
        }else{
          observer.next(null);
        }
        observer.complete();
      });
    }, 1000);
  });

  //获取菜单列表
  getMenuList(){
    this.par_url.Parameter_Post(this.par_url.getAppUrl('/menulist'),this.menulist).subscribe((data)=>{
      this.menuRsData = data;
      if(this.menuRsData.flag==true){
        if(this.menuRsData.data==null){
          this.menulist.pageindex = 0;
          this.menulist.total = 0;
          this.listOfData = [];
        }else{
          this.menulist.pageindex = this.menuRsData.data.pageNum == null? 0 : this.menuRsData.data.pageNum;//当前页
          this.menulist.total = this.menuRsData.data.total == null? 0 : this.menuRsData.data.total;//总条目数
          this.listOfData = this.menuRsData.data.list == null? [] : this.menuRsData.data.list;//数据集
        }
      }else{
        
      }
    });
  }

  //获取一级菜单列表
  getFirstMenuList(){
    this.par_url.NoVal_Get(this.par_url.getAppUrl('/menufirstlist')).subscribe((data)=>{
      this.menuRsData = data;
      if(this.menuRsData.flag==true){
        for(let i = 0;i<this.menuRsData.data.length;i++){
          this.genderAscription.push({menuName : this.menuRsData.data[i].menuName,menuId : this.menuRsData.data[i].menuId});
        }
      }else{

      }
    });
  }

  //table渲染--结束

}
