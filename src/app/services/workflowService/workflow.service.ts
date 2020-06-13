import {Injectable} from '@angular/core';
import {UserService} from '../userService/user.service';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '../shared/logger.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private userService: UserService, private http: HttpClient, private logger: LoggerService) {
  }

  private currentServiceEndPoint = 'workflow';
  private baseAPIUrl = environment.baseAPIUrl.concat(this.currentServiceEndPoint);

  public approveWorkflow(id: number, response: string): Promise<any> {
    return this.http.put(
      this.baseAPIUrl.concat('/').concat(String(id)).concat('/approve'), {
        response
      }, {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot approve workflow on \'WorkflowService\'', error);
        throw error;
      });
  }

  public denyWorkflow(id: number, response: string): Promise<any> {
    return this.http.put(
      this.baseAPIUrl.concat('/').concat(String(id)).concat('/deny').replace('{id}', id.toString()), {
        response
      }, {
        headers: this.userService.getAuthHttpHeader()
      }
    )
      .toPromise()
      .then()
      .catch(error => {
        this.logger.debug('Cannot deny workflow on \'WorkflowService\'', error);
        throw error;
      });
  }
}
