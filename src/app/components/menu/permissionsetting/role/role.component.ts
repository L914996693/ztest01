import { AfterViewInit, Component, OnInit ,ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzFormatEmitEvent, NzTreeComponent,NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { DatePipe } from '@angular/common';

import { ParameterserviceService } from '../../../../services/parameterservice/parameterservice.service';
import { TransferItem } from 'ng-zorro-antd/transfer';

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
  //设置分配菜单弹出层状态
  disMenuisVisible = false;
  //设置分配权限弹出层状态
  disJurisVisible = false;
  //加载状态
  isSpinning = false;

  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  //设置Tree反显数据状态
  defaultCheckedKeys = [];
  //defaultSelectedKeys = ['0-0-0'];
  defaultExpandedKeys = [];
  //已选择Tree集合
  nodesarray:Array<String>=[];
  nodesprantarr:Array<String>=[];

  nodes: NzTreeNodeOptions[] = [];

  //分配菜单-设置提交按钮状态
  disabled:any='disabled';
  //分配权限-设置提交按钮状态
  disJurdisabled:any='disabled';

  //穿梭组件数据源集合
  translist: TransferItem[] = [];
  //穿梭组件已选择数据集合
  transarray:Array<String>=[];

  //角色查询参数
  rolelist:any={
    roleName:'',
    total:20,
    pageindex:1,
    pagesize:10
  }

  //记录其他操作roleid
  private downRoleId:string='';

  //角色响应接收
  private roleReData:any={};

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
    private message: NzMessageService,
    ) { 
      //初始化新增角色role
      this.addRolevalidateForm = this.fb.group({
        roleName: ['', [Validators.required], [this.userNameAsyncValidator]],//[this.userNameAsyncValidator]
        comment: ['',[Validators.required]],
      });
     }

  ngOnInit(): void {
    //初始化查询条件
    this.roqvalidateForm = this.fb.group({
      roleName: [''],
    });
    this.getMenuList();
  }

  //设置form样式
  get isHorizontal(): boolean {
    return this.roqvalidateForm.controls.formLayout?.value === 'inline';
  }

  //查询角色
  submitForm(): void {
    if(this.rolelist.roleName!=null){
      this.rolelist.roleName = this.roqvalidateForm.value.roleName
    }else{
      this.rolelist.roleName = "";
    }
    this.getMenuList();
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
  roleFind(roleid:string){
    this.parutill.Parameter_Get(this.parutill.getAppUrl('/rolefind'),"roleId="+roleid).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag == true){
        this.addRolevalidateForm.patchValue({
          roleName: this.roleReData.data.roleCode,
          comment: this.roleReData.data.roleNamezh
        });
        this.isVisible = true;
      }else{

      }
    })
  }

  //删除角色
  delRole(userid:string){
    this.parutill.Parameter_Get(this.parutill.getAppUrl('/roledel'),"roleid="+userid).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag == true){
        this.message.create('success', this.roleReData.message);
        this.getMenuList();
      }else{
        this.getMenuList();
        this.message.create('error', this.roleReData.message);
      }
    })
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
      setTimeout(() => {
        this.parutill.Parameter_Get(this.parutill.getAppUrl('/rolename'),"rolename="+control.value).subscribe((data)=>{
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

  //新增-修改角色
  submitFormaddUser(value: { roleName: string; comment: string;}): void {
    console.log(value.roleName+"--"+value.comment)
    var roledata = {
      roleId: this.downRoleId,
      roleName: value.roleName,
      roleNamezh: value.comment,
      roleCode: value.roleName
    }
    this.parutill.Parameter_Post(this.parutill.getAppUrl('/roleaddmod'),roledata).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag == true){
        this.isVisible = false;
        this.message.create('success', this.roleReData.message);
        this.getMenuList();
      }else{
        this.isVisible = false;
        this.getMenuList();
        this.message.create('error', this.roleReData.message);
      }
    })
  }

  //角色列表
  getMenuList(){
    this.parutill.Parameter_Post(this.parutill.getAppUrl('/rolelist'),this.rolelist).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag==true){
        if(this.roleReData.data==null){
          this.rolelist.pageindex = 0;
          this.rolelist.total = 0;
          this.listOfData = [];
        }else{
          this.rolelist.pageindex = this.roleReData.data.pageNum == null? 0 : this.roleReData.data.pageNum;//当前页
          this.rolelist.total = this.roleReData.data.total == null? 0 : this.roleReData.data.total;//总条目数
          this.listOfData = this.roleReData.data.records == null? [] : this.roleReData.data.records;//数据集
        }
      }else{
        
      }
    });
  }

  //分配权限
  disJur(){
    //console.log("分配权限"+this.downRoleId);
    var rolperion = {
      rparray: this.transarray,
      roleid: this.downRoleId
    }
    this.translist = [];
    this.parutill.Parameter_Post(this.parutill.getAppUrl('/roletranslist'),rolperion).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag == true){
        this.translist = this.roleReData.data;
        for(let i=0;i<this.roleReData.data.length;i++){
          if(this.roleReData.data[i].direction == 'right'){
            this.transarray.push(this.roleReData.data[i].key);
          }
        }
        this.disJurisVisible =true;
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
    this.disJurdisabled = 'false';
  }

  disJurhandleOk(): void {
    this.translist = [];
    this.disJurisVisible = false;
  }
  disJurhandleCancel(): void {
    this.translist = [];
    this.disJurisVisible = false;
  }
  //提交权限
  submitdisJur(){
    //console.log("提交权限")
    var rolper = {
      rparray: this.transarray,
      roleid: this.downRoleId
    }
    this.parutill.Parameter_Post(this.parutill.getAppUrl('/rpermissionsub'),rolper).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag == true){
        this.message.create('success', this.roleReData.message);
        //关闭弹出层
        this.disJurisVisible = false;
      }else{
        this.message.create('error', this.roleReData.message);
      }
    })
  }
  //分配权限结束


  //分配菜单
  disMenu(){
    //获取菜单树&反显角色已拥有菜单
    this.parutill.Parameter_Get(this.parutill.getAppUrl('/menuroletreelist'),"roleid="+this.downRoleId).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag==true){
        this.nodes = this.roleReData.data.rmenuTree;
        this.defaultCheckedKeys=this.roleReData.data.menuidlist;
        this.defaultExpandedKeys=this.roleReData.data.menuidlist;
      }else{
        
      }
    })
    this.disMenuisVisible = true;
  }
  
  disMenuhandleOk(): void {
    this.disMenuisVisible = false;
  }
  disMenuhandleCancel(): void {
    this.disMenuisVisible = false;
  }
  //提交菜单
  submitdisMenu(){
    var rolmen = {
      rmarray: this.nodesarray,
      roleid: this.downRoleId
    }
    this.parutill.Parameter_Post(this.parutill.getAppUrl('/menuroletreesub'),rolmen).subscribe((data)=>{
      this.roleReData = data;
      if(this.roleReData.flag == true){
        this.message.create('success', this.roleReData.message);
        //关闭弹出层
        this.disMenuisVisible = false;
      }else{
        this.message.create('error', this.roleReData.message);
      }
    })
  }

  //获取角色ID持久化
  downRole(roleid:string){
    this.downRoleId = roleid;
  }
  
  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    //已选择的菜单ID
    this.nodesarray = [];
    this.nodesprantarr = [];
    for(let i=0;i<this.nzTreeComponent.getCheckedNodeList().length;i++){
      if(this.nzTreeComponent.getCheckedNodeList()[i].parentNode != null){
        if(this.nodesprantarr.indexOf(this.nzTreeComponent.getCheckedNodeList()[i].parentNode.key)==-1){
          this.nodesprantarr.push(this.nzTreeComponent.getCheckedNodeList()[i].parentNode.key)
        }
      }
      this.nodesarray.push(this.nzTreeComponent.getCheckedNodeList()[i].key);
    }
    if(this.nodesprantarr.length > 0){
      for(let j=0;j<this.nodesprantarr.length;j++){
        if(this.nodesarray.indexOf(this.nodesprantarr[j])==-1){
          this.nodesarray.push(this.nodesprantarr[j]);
        }
      }
    }
    for(let k=0;k<event.nodes.length;k++){
      if(this.nodesarray.indexOf(event.nodes[k].key) == -1 || event.nodes[k].parentNode == null){
        for(let g=0;g< event.nodes[k].origin.children.length;g++){
          if(this.nodesarray.indexOf(event.nodes[k].origin.children[g].key)==-1){
            this.nodesarray.push(event.nodes[k].origin.children[g].key);
          }
        }
      }
    }
    if(this.nodesarray.length > 0){
      this.disabled = 'false';
    }else{
      this.disabled = 'disabled';
    }
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys);
  }

}
