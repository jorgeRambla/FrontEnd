import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/common/login/login.component';
import {UserService} from './services/userService/user.service';
import {SignUpComponent} from './components/common/sign-up/sign-up.component';
import {ConfirmTokenComponent} from './components/common/confirm-token/confirm-token.component';
import {EditorRequestRequestComponent} from './components/user-components/editor-request-request/editor-request-request.component';
import {ViewPublicQuizzesComponent} from './components/user-components/view-public-quizzes/view-public-quizzes.component';
import {EditorRequestManageComponent} from './components/reviewer-components/editor-request-manage/editor-request-manage.component';
import {GameComponentsRequestManagerComponent} from './components/reviewer-components/game-request-manager/game-components-request-manager.component';
import {CreateQuestionComponent} from './components/editor-components/create-question/create-question.component';
import {ViewMyQuestionsComponent} from './components/editor-components/view-my-questions/view-my-questions.component';

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
    path: 'my-questions',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: ViewMyQuestionsComponent,
        canActivate: [UserService]
      },
      {
        path: 'new',
        component: CreateQuestionComponent,
        canActivate: [UserService]
      }
    ]
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
