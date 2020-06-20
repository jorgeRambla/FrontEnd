import { Injectable } from '@angular/core';
import {UserService} from '../userService/user.service';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '../shared/logger.service';
import {environment} from '../../../environments/environment';
import {QuestionRequest} from '../../model/question/Question.request';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private userService: UserService, private http: HttpClient, private logger: LoggerService) { }
  private currentServiceEndPoint = 'question';
  private baseAPIUrl = environment.baseAPIUrl.concat(this.currentServiceEndPoint);

  public createQuestion(question: QuestionRequest): Promise<any> {
    return this.http.post(
      this.baseAPIUrl,
      question,
      {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot create Question on \'QuestionService\'', error);
        throw error;
      });
  }
}
