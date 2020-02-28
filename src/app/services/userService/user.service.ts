import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenModel} from '../../model/Token.model';
import {LoggerService} from '../shared/logger.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../../model/user/User.model';
import {UserRolModel} from '../../model/user/UserRol.model';
import sha256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  constructor(private http: HttpClient, private router: Router, private logger: LoggerService) { }
  private currentServiceEndPoint = 'user';
  private baseAPIUrl = environment.baseAPIUrl.concat(this.currentServiceEndPoint);

  private static setTokenSessionData(token: TokenModel): void {
    localStorage.setItem('jsonToken', token.jsonWebToken);
    localStorage.setItem('jsonToken.expiration', new Date(Date.now() + token.expirationTime).toString());
  }

  private static setUserSessionData(user: UserModel): void {
    localStorage.setItem('user.id', String(user.id));
    localStorage.setItem('user.username', String(user.username));
    localStorage.setItem('user.rol', String(user.role.map(item => {
      return sha256(String(item));
    })));
  }

  private static removeSessionData(): void {
    localStorage.clear();
  }

  public static getUserId(): number {
    return Number(localStorage.getItem('user.id'));
  }

  public getAuthHttpHeader(): HttpHeaders {
    return new HttpHeaders({Authorization: 'Bearer '.concat(localStorage.getItem('jsonToken'))});
  }

  public login(username: string, password: string): Promise<any> {
    return this.http.post(
      this.baseAPIUrl.concat('/login'), {
        username,
        password
      })
      .toPromise()
      .then( data => {
        UserService.setTokenSessionData(data as TokenModel);
        return data as TokenModel;
      })
      .catch( error => {
        this.logger.debug('Cannot perform login on \'UserService\'', error);
        throw error;
      });
  }

  /**
   * Send POST request to confirm user creation token
   * @param token: string
   */
  public confirmToken(token: string): Promise<any> {
    return this.http.post(
      this.baseAPIUrl.concat('/confirm/').concat(token), {
      })
      .toPromise()
      .catch( error => {
        this.logger.debug('Cannot confirm token on \'UserService\', ['.concat(token).concat(']'), error);
        throw error;
      });
  }

  /**
   * Send POST request to create user
   * @param username: string
   * @param password: string
   * @param email: string
   * @param fullName: string
   */
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

  public retrieveCurrentSessionUserData(): Promise<UserModel> {
    return this.http.get(
      this.baseAPIUrl.concat('/info'), {
        headers: this.getAuthHttpHeader()
      })
      .toPromise()
      .then( data => {
        UserService.setUserSessionData(data as UserModel);
        return data as UserModel;
      } )
      .catch( error => {
        this.logger.debug('Cannot fetch current session user on \'UserService\'', error);
        throw error;
      });
  }

  public retrieveUserDataById(id: number): Promise<UserModel> {
    return this.http.get(
      this.baseAPIUrl.concat('/info/').concat(String(id)), {
        headers: this.getAuthHttpHeader()
      })
      .toPromise()
      .then( data => {
        return data as UserModel;
      } )
      .catch( error => {
        this.logger.debug('Cannot fetch user by id {{id}} on \'UserService\''.replace('{id}', String(id)), error);
        throw error;
      });
  }

  public updateCurrentSessionUser(username: string, password: string, email: string,
                                  fullName: string, role?: UserRolModel[]): Promise<UserModel> {
    return this.updateUserById(UserService.getUserId(), username, password, email, fullName, role);
  }

  public updateUserById(id: number, username: string, password: string, email: string,
                        fullName: string, role?: UserRolModel[]): Promise<UserModel> {
    return this.http.put(
      this.baseAPIUrl.concat('/info'), {
        username,
        password,
        email,
        fullName,
        role
      }, {
        headers: this.getAuthHttpHeader()
      })
      .toPromise()
      .then( data => {
        return data as UserModel;
      })
      .catch( error => {
        this.logger.debug('Cannot update current user on \'UserService\'', error);
        throw error;
      });
  }

  public sessionIsActive(): boolean {
    //TODO: complete this method
    return localStorage.getItem('jsonToken') !== null;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/login' || state.url === '/sign-up' || state.url.match('^\/confirm-token\/([A-Z0-9a-z-]+)$')) {
      if (this.sessionIsActive()) {
        this.router.navigate(['home']).then( action => {
          this.logger.debug('Session is active, go to HOME', action);
          return false;
        });
      }
    } else {
      if (!this.sessionIsActive()) {
        this.router.navigate(['login']).then(action => {
          this.logger.debug('Session isn\'t active, go to login', action);
          return false;
        });
      }
      return true;
    }
    return true;
  }
}
