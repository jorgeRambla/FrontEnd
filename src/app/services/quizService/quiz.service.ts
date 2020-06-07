import { Injectable } from '@angular/core';
import {UserService} from '../userService/user.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggerService} from '../shared/logger.service';
import {QuestionModel} from '../../model/question/Question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private userService: UserService, private http: HttpClient, private logger: LoggerService) { }
  private currentServiceEndPoint = 'quiz';
  private baseAPIUrl = environment.baseAPIUrl.concat(this.currentServiceEndPoint);

  public createQuiz(title: string, description: string, questionIds: number[], draft: boolean): Promise<any> {
    return this.http.post(
     this.baseAPIUrl, {
        title,
        description,
        questionIds,
        draft
      },
      {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot create Quiz on \'QuizService\'', error);
        throw error;
      });
  }

  public retrieveCurrentUserQuizList(): Promise<QuestionModel[]> {
    return this.retrieveQuizListByOwnerId(UserService.getUserId());
  }

  public retrieveQuizListByOwnerId(id: number): Promise<QuestionModel[]> {
    return this.http.get(
      this.baseAPIUrl.concat('/list/').concat(String(id)), {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then(data => {
        return data as QuestionModel[];
      })
      .catch();
  }
}
