import {Injectable} from '@angular/core';
import {UserService} from '../userService/user.service';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '../shared/logger.service';
import {environment} from '../../../environments/environment';
import {EditorRequestModel} from '../../model/EditorRequest/EditorRequest.model';
import {WorkflowStatusModel} from '../../model/workflow/WorkflowStatus.model';
import {PageableCollectionModel} from '../../model/PageableCollection.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private userService: UserService, private http: HttpClient, private logger: LoggerService) {
  }

  private currentServiceEndPoint = 'request';
  private baseAPIUrl = environment.baseAPIUrl.concat(this.currentServiceEndPoint);

  public createEditorRequest(description: string): Promise<any> {
    return this.http.post(
      this.baseAPIUrl.concat('/editor/'), {
        description
      }, {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot create editor request on \'RequestService\'', error);
        throw error;
      });
  }

  public updateEditorRequest(description: string): Promise<any> {
    return this.http.put(
      this.baseAPIUrl.concat('/editor/'), {
        description
      }, {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot update editor request on \'RequestService\'', error);
        throw error;
      });
  }

  public getCurrentUserEditorRequest(): Promise<EditorRequestModel> {
    return this.http.get(
      this.baseAPIUrl.concat('/editor'), {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then(data => {
        return data as EditorRequestModel;
      })
      .catch(error => {
        this.logger.debug('Cannot create editor request on \'RequestService\'', error);
        throw error;
      });
  }

  public getEditorRequests(closed: boolean = false, approved: boolean = false,
                           requestStatus?: WorkflowStatusModel[]): Promise<EditorRequestModel[]> {
    return this.http.get(
      this.baseAPIUrl.concat('/editor/list'), {
        headers: this.userService.getAuthHttpHeader(),
        params: {
          closed: String(closed),
          approved: String(approved),
          requestStatus: String(requestStatus)
        }
      }
    )
      .toPromise()
      .then(data => {
        return data as EditorRequestModel[];
      })
      .catch(error => {
        this.logger.debug('Cannot fetch editor request list', error);
        throw error;
      });
  }

  public getEditorRequestsPaging(all: boolean, closed: boolean, approved: boolean, page: number, size: number,
                                 sortColumn: string, sortType: string,
                                 requestStatus?: WorkflowStatusModel[]): Promise<PageableCollectionModel<EditorRequestModel>> {
    return this.http.get(
      this.baseAPIUrl.concat('/editor/list'), {
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
        return data as PageableCollectionModel<EditorRequestModel>;
      })
      .catch(error => {
        this.logger.debug('Cannot fetch editor request list', error);
        throw error;
      });
  }
}
