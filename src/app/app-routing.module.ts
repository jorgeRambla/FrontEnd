import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserService} from './services/userService/user.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SidenavNavComponent} from './components/sidenav-nav/sidenav-nav.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
