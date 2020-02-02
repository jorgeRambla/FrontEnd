import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Token} from '../../model/Token';
import {LoggerService} from '../shared/logger.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  constructor(private http: HttpClient, private router: Router, private logger: LoggerService) { }
  private currentServiceEndPoint = 'user/';
  private baseAPIUrl = environment.baseAPIUrl.concat(this.currentServiceEndPoint);

  private static setSessionData(token: Token) {
    localStorage.setItem('jsonToken', token.jsonWebToken);
    localStorage.setItem('jsonToken.expiration', new Date(Date.now() + token.expirationTime).toString());
  }

  public login(username: string, password: string): Promise<any> {
    return this.http.post(
      this.baseAPIUrl.concat('login'), {
        username,
        password
      })
      .toPromise()
      .then( data => {
        UserService.setSessionData(data as Token);
        return data as Token;
      })
      .catch( error => {
        this.logger.debug('Cannot perform login on \'UserService\'', error);
        throw error;
      });
  }

  public confirmToken(token: string): Promise<any> {
    return this.http.post(
      this.baseAPIUrl.concat('confirm/').concat(token), {
      })
      .toPromise()
      .catch( error => {
        this.logger.debug('Cannot confirm token on \'UserService\', ['.concat(token).concat(']'), error);
        throw error;
      });
  }

  public createUser(username: string, password: string, email: string, fullName: string) {
    return this.http.post(
     this.baseAPIUrl, {
        username,
        password,
        email,
        fullName
      })
      .toPromise()
      .then()
      .catch( error => {
        this.logger.debug('Cannot create user on \'UserService\'', error);
        throw error;
      });
  }

  public sessionIsActive(): boolean {
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionIsActive()) {
      this.router.navigate(['']).then(action => {
        this.logger.debug('Session is active, go to ...', action);
        return true;
      });
    } else {
      this.router.navigate(['']).then(action => {
        this.logger.debug('Session isn\'t active, go to ...', action);
        return false;
      });
    }
    return false;
  }
}
