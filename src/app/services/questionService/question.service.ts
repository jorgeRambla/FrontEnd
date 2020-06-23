import { Injectable } from '@angular/core';
import {UserService} from '../userService/user.service';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '../shared/logger.service';
import {environment} from '../../../environments/environment';
import {QuestionRequest} from '../../model/question/Question.request';
import {QuestionModel} from '../../model/question/Question.model';
import {PageableCollectionModel} from '../../model/PageableCollection.model';
import {WorkflowStatusModel} from '../../model/workflow/WorkflowStatus.model';

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

  public updateQuestion(id: number, question: QuestionRequest): Promise<any> {
    return this.http.put(
      this.baseAPIUrl.concat('/{}').replace('{}', String(id)),
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

  public getQuestionsPaging(all: boolean, published: boolean, page: number, size: number, sortColumn: string, sortType: string,
                            query: string, requestStatus?: WorkflowStatusModel[]): Promise<PageableCollectionModel<QuestionModel>> {
    return this.http.get(
      this.baseAPIUrl.concat('/list'),
      {
        headers: this.userService.getAuthHttpHeader(),
        params: {
          all: String(all),
          published: String(published),
          requestStatus: String(requestStatus),
          page: String(page),
          size: String(size),
          sortColumn: String(sortColumn),
          sortType: String(sortType),
          query: String(query)
        }
      }
    )
      .toPromise()
      .then(data => {
        return data as PageableCollectionModel<QuestionModel>;
      })
      .catch(error => {
        this.logger.debug('Cannot get Questions on \'QuestionService\'', error);
        throw error;
      });
  }

  public getQuestionById(id: number): Promise<QuestionModel> {
    return this.http.get(
      this.baseAPIUrl.concat('/{}').replace('{}', String(id)),
      {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then(data => {
        return data as QuestionModel;
      })
      .catch(error => {
        this.logger.debug('Cannot get Question on \'QuestionService\'', error);
        throw error;
      });
  }
}
