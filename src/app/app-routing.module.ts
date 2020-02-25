import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserService} from './services/userService/user.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SidenavNavComponent} from './components/privileged-user/sidenav-nav/sidenav-nav.component';
import {ConfirmTokenComponent} from './components/confirm-token/confirm-token.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavNavComponent,
    canActivate: [UserService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UserService]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [UserService]
  },
  {
    path: 'confirm-token/:token',
    component: ConfirmTokenComponent,
    canActivate: [UserService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
