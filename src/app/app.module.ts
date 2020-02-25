import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MaterialModule} from './material.module';
import {UserService} from './services/userService/user.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SidenavNavComponent } from './components/privileged-user/sidenav-nav/sidenav-nav.component';
import { SidenavMenusComponent } from './components/privileged-user/sidenav-menus/sidenav-menus.component';
import { ConfirmTokenComponent } from './components/confirm-token/confirm-token.component';
import {PermissionService} from './services/permissionService/permission.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    SidenavNavComponent,
    SidenavMenusComponent,
    ConfirmTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    UserService,
    PermissionService
  ],
  bootstrap: [SidenavNavComponent]
})
export class AppModule { }

