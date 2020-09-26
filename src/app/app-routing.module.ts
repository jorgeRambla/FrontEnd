import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/common/login/login.component';
import {UserService} from './services/userService/user.service';
import {SignUpComponent} from './components/common/sign-up/sign-up.component';
import {ConfirmTokenComponent} from './components/common/confirm-token/confirm-token.component';
import {EditorRequestRequestComponent} from './components/user-components/editor-request-request/editor-request-request.component';
import {ViewPublicQuizzesComponent} from './components/user-components/view-public-quizzes/view-public-quizzes.component';
import {EditorRequestManageComponent} from './components/reviewer-components/editor-request-manage/editor-request-manage.component';
import {QuizRequestManagerComponent} from './components/reviewer-components/quiz-request-manager/quiz-request-manager.component';
import {CreateQuestionComponent} from './components/editor-components/create-question/create-question.component';
import {ViewMyQuestionsComponent} from './components/editor-components/view-my-questions/view-my-questions.component';
import {ViewMyQuizzesComponent} from './components/editor-components/view-my-quizzes/view-my-quizzes.component';
import {CreateQuizComponent} from './components/editor-components/create-quiz/create-quiz.component';
import {PlayQuizComponent} from './components/user-components/play-quizz/play-quiz.component';

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
    path: 'manage-requests-quiz',
    component: QuizRequestManagerComponent,
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
      },
      {
        path: 'update/:id',
        component: CreateQuestionComponent,
        canActivate: [UserService]
      }
    ]
  },
  {
    path: 'my-quizzes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: ViewMyQuizzesComponent,
        canActivate: [UserService]
      },
      {
        path: 'new',
        component: CreateQuizComponent,
        canActivate: [UserService]
      },
      {
        path: 'update/:id',
        component: CreateQuizComponent,
        canActivate: [UserService]
      }
    ]
  },
  {
    path: 'play/:id',
    component: PlayQuizComponent,
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
