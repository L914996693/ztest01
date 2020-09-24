import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';

import { LoginModule } from './components/login/login.module';

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
import en from '@angular/common/locales/en';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserlistComponent } from './components/menu/user/userlist/userlist.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    UserlistComponent,
  ],
  exports:[],
  imports: [
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
  providers: [{ provide: NZ_I18N, useValue: en_US },NzModalService,NzMessageService,NzIconModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
