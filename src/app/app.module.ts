import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { NgxPrintModule } from 'ngx-print';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { LoginModule } from './components/login/login.module';

import { NzSelectModule } from 'ng-zorro-antd';
import { NzDividerModule } from 'ng-zorro-antd';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserlistComponent } from './components/menu/user/userlist/userlist.component';
import { TableComponent } from './components/menu/table/table.component';
import { MenumComponent } from './components/menu/permissionsetting/menum/menum.component';
import { RoleComponent } from './components/menu/permissionsetting/role/role.component';
import { UserComponent } from './components/menu/permissionsetting/user/user.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    UserComponent,
    RoleComponent,
    MenumComponent,
    
    TableComponent,
    AppComponent,
    LoginComponent,
    MenuComponent,
    UserlistComponent,
  ],
  exports:[],
  imports: [
    NzDividerModule,
    NzSelectModule,
    NzDropDownModule,
    NzIconModule,
    RouterModule,
    NzModalModule,
    NzDatePickerModule,
    NgxPrintModule,
    NzTableModule,
    NzTypographyModule,
    NzBreadCrumbModule,
    NzSliderModule,
    NzMenuModule,
    NzListModule,
    NzLayoutModule,
    LoginModule,
    NzPopconfirmModule,
    NzAlertModule,
    HttpClientJsonpModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NgZorroAntdMobileModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy, },NzModalService,NzMessageService,NzIconModule,NzDropDownModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
