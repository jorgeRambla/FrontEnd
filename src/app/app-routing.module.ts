import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserService} from './services/userService/user.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SidenavNavComponent} from './components/privileged-user/sidenav-nav/sidenav-nav.component';
import {ConfirmTokenComponent} from './components/confirm-token/confirm-token.component';
import {EditorRequestRequestComponent} from './components/editor-request-request/editor-request-request.component';
import {RootComponent} from './components/root/root.component';
import {ViewPublicQuizzesComponent} from './components/view-public-quizzes/view-public-quizzes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
    path: 'home',
    component: ViewPublicQuizzesComponent,
    canActivate: [UserService]
  },
  {
    path: 'request-editor',
    component: EditorRequestRequestComponent,
    canActivate: [UserService]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
