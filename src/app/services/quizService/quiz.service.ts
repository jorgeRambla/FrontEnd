import { Injectable } from '@angular/core';
import {UserService} from '../userService/user.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoggerService} from '../shared/logger.service';
import {QuestionModel} from '../../model/question/Question.model';
import {WorkflowStatusModel} from '../../model/workflow/WorkflowStatus.model';
import {PageableCollectionModel} from '../../model/PageableCollection.model';
import {QuizModel} from '../../model/quiz/Quiz.model';
import {QuizRequest} from '../../model/quiz/Quiz.request';
import {QuizSimplified} from '../../model/quiz/Quiz.simplified';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private userService: UserService, private http: HttpClient, private logger: LoggerService) { }
  private currentServiceEndPoint = 'quiz';
  private baseAPIUrl = environment.baseAPIUrl.concat(this.currentServiceEndPoint);

  public createQuiz(quiz: QuizRequest): Promise<any> {
    return this.http.post(
     this.baseAPIUrl,
      quiz,
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

  public updateQuiz(id: number, quiz: QuizRequest): Promise<any> {
    return this.http.put(
      this.baseAPIUrl.concat('/{}').replace('{}', String(id)),
      quiz,
      {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot update Quiz on \'QuizService\'', error);
        throw error;
      });
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

  public getQuizById(id: number): Promise<QuizModel> {
    return this.http.get(
      this.baseAPIUrl.concat('/').concat(String(id)), {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then(data => {
        return data as QuizModel;
      })
      .catch(error => {
        this.logger.debug('Cannot get Quiz by given id on \'QuizService\'', error);
        throw error;
      });
  }

  public getQuizzesPaging(all: boolean, published: boolean, page: number, size: number, sortColumn: string, sortType: string,
                          query: string, requestStatus?: WorkflowStatusModel[]): Promise<PageableCollectionModel<QuizModel>> {
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
        return data as PageableCollectionModel<QuizModel>;
      })
      .catch(error => {
        this.logger.debug('Cannot get Quizzes on \'QuizService\'', error);
        throw error;
      });
  }

  public deleteQuizById(id: number): Promise<any> {
    return this.http.delete(
      this.baseAPIUrl.concat('/').concat(String(id)),
      {
        headers: this.userService.getAuthHttpHeader(),
        responseType: 'text'
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot delete Quiz on \'QuizService\'', error);
        throw error;
      });
  }

  public getQuizRequestsPaging(all: boolean, closed: boolean, approved: boolean, page: number, size: number,
                               sortColumn: string, sortType: string,
                               requestStatus?: WorkflowStatusModel[]): Promise<PageableCollectionModel<QuizModel>> {
    return this.http.get(
      this.baseAPIUrl.concat('/request/list'), {
        headers: this.userService.getAuthHttpHeader(),
        params: {
          all: String(all),
          closed: String(closed),
          approved: String(approved),
          requestStatus: String(requestStatus),
          page: String(page),
          size: String(size),
          sortColumn: String(sortColumn),
          sortType: String(sortType)
        }
      }
    )
      .toPromise()
      .then(data => {
        return data as PageableCollectionModel<QuizModel>;
      })
      .catch(error => {
        this.userService.checkUserIsAuthorized(error);
        this.logger.debug('Cannot fetch quiz request list', error);
        throw error;
      });
  }

  public getQuizSearchPaging(query: string, page: number, size: number, sortColumn: string,
                             sortType: string): Promise<PageableCollectionModel<QuizSimplified>> {
    return this.http.get(
      this.baseAPIUrl.concat('/search'), {
        headers: this.userService.getAuthHttpHeader(),
        params: {
          query: String(query),
          page: String(page),
          size: String(size),
          sortColumn: String(sortColumn),
          sortType: String(sortType)
        }
      }
    )
      .toPromise()
      .then(data => {
        return data as PageableCollectionModel<QuizSimplified>;
      })
      .catch(error => {
        this.userService.checkUserIsAuthorized(error);
        this.logger.debug('Cannot fetch quiz search list', error);
        throw error;
      });
  }
}
