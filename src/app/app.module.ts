import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { UserService } from './services/userService/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/common/login/login.component';
import { SignUpComponent } from './components/common/sign-up/sign-up.component';
import { SidenavNavComponent } from './components/common/privileged-user/sidenav-nav/sidenav-nav.component';
import { SidenavMenusComponent } from './components/common/privileged-user/sidenav-menus/sidenav-menus.component';
import { ConfirmTokenComponent } from './components/common/confirm-token/confirm-token.component';
import { PermissionService } from './services/permissionService/permission.service';
import { EditorRequestRequestComponent } from './components/user-components/editor-request-request/editor-request-request.component';
import { RootComponent } from './components/common/root/root.component';
import { ViewPublicQuizzesComponent } from './components/user-components/view-public-quizzes/view-public-quizzes.component';
import { WorkflowDisplayComponent } from './components/common/workflow-display/workflow-display.component';
import { WorkflowManageDisplayComponent } from './components/common/workflow-manage-display/workflow-manage-display.component';
import { EditorRequestManageComponent } from './components/reviewer-components/editor-request-manage/editor-request-manage.component';
import { QuizRequestManagerComponent } from './components/reviewer-components/quiz-request-manager/quiz-request-manager.component';
import { CreateQuestionComponent } from './components/editor-components/create-question/create-question.component';
import { ViewMyQuestionsComponent } from './components/editor-components/view-my-questions/view-my-questions.component';
import { StatusTagComponent } from './components/common/status-tag/status-tag.component';
import { AlertingComponent } from './components/common/alerting/alerting.component';
import { CreateQuizComponent } from './components/editor-components/create-quiz/create-quiz.component';
import { ViewMyQuizzesComponent } from './components/editor-components/view-my-quizzes/view-my-quizzes.component';
import {RequestManageComponent} from './components/reviewer-components/request-manage/request-manage.component';
import { TermsAndConditionsComponent } from './components/common/legal/terms-and-conditions/terms-and-conditions.component';
import { DialogNotificationComponent } from './components/common/dialog-notification/dialog-notification.component';
import { CreateQuestionDialogComponent } from './components/editor-components/create-question/dialog/create-question-dialog/create-question-dialog.component';
import {MurcyIcons} from './services/shared/murcy.icons';
import { PlayQuizComponent } from './components/user-components/play-quizz/play-quiz.component';

@NgModule({
  entryComponents: [
    TermsAndConditionsComponent,
    DialogNotificationComponent,
    CreateQuestionDialogComponent
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    SidenavNavComponent,
    SidenavMenusComponent,
    ConfirmTokenComponent,
    EditorRequestRequestComponent,
    RootComponent,
    ViewPublicQuizzesComponent,
    WorkflowDisplayComponent,
    WorkflowManageDisplayComponent,
    EditorRequestManageComponent,
    QuizRequestManagerComponent,
    CreateQuestionComponent,
    ViewMyQuestionsComponent,
    StatusTagComponent,
    AlertingComponent,
    CreateQuizComponent,
    ViewMyQuizzesComponent,
    RequestManageComponent,
    TermsAndConditionsComponent,
    DialogNotificationComponent,
    CreateQuestionDialogComponent,
    PlayQuizComponent
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
    PermissionService,
    MurcyIcons
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }

