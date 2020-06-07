import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserService} from './services/userService/user.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ConfirmTokenComponent} from './components/confirm-token/confirm-token.component';
import {EditorRequestRequestComponent} from './components/editor-request-request/editor-request-request.component';
import {ViewPublicQuizzesComponent} from './components/view-public-quizzes/view-public-quizzes.component';
import {EditorRequestManageComponent} from './components/editor-request-manage/editor-request-manage.component';
import {GameComponentsRequestManagerComponent} from './components/game-request-manager/game-components-request-manager.component';

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
    path: 'manage-requests-editor',
    component: EditorRequestManageComponent,
    canActivate: [UserService]
  },
  {
    path: 'manage-requests',
    component: GameComponentsRequestManagerComponent,
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
