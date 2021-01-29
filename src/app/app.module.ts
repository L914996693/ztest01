import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//cnpm install ngx-print
import { NgxPrintModule } from 'ngx-print';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { LoginModule } from './components/login/login.module';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';
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
import { HttpClientModule,HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenumComponent } from './components/menu/permissionsetting/menum/menum.component';
import { RoleComponent } from './components/menu/permissionsetting/role/role.component';
import { UserComponent } from './components/menu/permissionsetting/user/user.component';
import { FiterCodeLengthPipePipe } from './services/parameterservice/fiter-code-length-pipe.pipe';
import { NoopInterceptorInterceptor } from './services/parameterservice/noop-interceptor.interceptor';
import { ParameterserviceService } from './services/parameterservice/parameterservice.service';


registerLocaleData(zh);

@NgModule({
  declarations: [
    UserComponent,
    RoleComponent,
    MenumComponent,
    AppComponent,
    LoginComponent,
    MenuComponent,
    FiterCodeLengthPipePipe,
  ],
  exports:[FiterCodeLengthPipePipe],
  imports: [
    NzSpinModule,
    NzTreeModule,
    NzTransferModule,
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
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy, },NzModalService,NzMessageService,NzSelectModule,NzIconModule,NzDropDownModule,ParameterserviceService,{provide:HTTP_INTERCEPTORS,useClass:NoopInterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
