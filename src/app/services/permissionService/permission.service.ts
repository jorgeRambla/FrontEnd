import {Injectable} from '@angular/core';
import {LoggerService} from '../shared/logger.service';
import {UserService} from '../userService/user.service';
import sha256 from 'crypto-js/sha256';
import {UserRolModel} from '../../model/user/UserRol.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private logger: LoggerService, private userService: UserService) {
  }

  private static transformEncryptedRolArrayToRolObjectArray(rolString: string[]): UserRolModel[] {
    const roles = [];
    for (const rol of rolString) {
      switch (rol) {
        case String(sha256('USER')):
          roles.push(UserRolModel.USER);
          break;
        case String(sha256('EDITOR')):
          roles.push(UserRolModel.EDITOR);
          break;
        case String(sha256('REVIEWER')):
          roles.push(UserRolModel.REVIEWER);
          break;
        case String(sha256('ADMINISTRATOR')):
          roles.push(UserRolModel.ADMINISTRATOR);
          break;
        default:
          break;
      }
    }
    return roles;
  }

  private static getHigherRol(roles: UserRolModel[]): UserRolModel {
    return roles.reduce((prev, curr) => (prev > curr) ? prev : curr);
  }

  public hasUserPermission(): boolean {
    // User rol is default permission
    const rolString = localStorage.getItem('user.rol');
    if (rolString === null) {
      localStorage.clear();
      return false;
    }
    return rolString.split(',').length > 0;
  }

  public hasEditorPermission(): boolean {
    const minRol = UserRolModel.EDITOR;
    const rolString = localStorage.getItem('user.rol');
    if (rolString === null) {
      localStorage.clear();
      return false;
    }
    const roles = PermissionService.transformEncryptedRolArrayToRolObjectArray(rolString.split(','));
    return PermissionService.getHigherRol(roles) >= minRol;
  }

  public hasReviewerPermission(): boolean {
    const minRol = UserRolModel.REVIEWER;
    const rolString = localStorage.getItem('user.rol');
    if (rolString === null) {
      localStorage.clear();
      return false;
    }
    const roles = PermissionService.transformEncryptedRolArrayToRolObjectArray(rolString.split(','));
    return PermissionService.getHigherRol(roles) >= minRol;
  }

  public hasAdminPermission(): boolean {
    // Due security policy user data will be fetched before each check
    this.userService.retrieveCurrentSessionUserData().then(() => {});
    const minRol = UserRolModel.ADMINISTRATOR;
    const rolString = localStorage.getItem('user.rol');
    if (rolString === null) {
      localStorage.clear();
      return false;
    }
    const roles = PermissionService.transformEncryptedRolArrayToRolObjectArray(rolString.split(','));
    return PermissionService.getHigherRol(roles) >= minRol;
  }

  public addEditorRol(): void {
    const rolString = localStorage.getItem('user.rol');
    const roles = PermissionService.transformEncryptedRolArrayToRolObjectArray(rolString.split(','));
    roles.push(UserRolModel.EDITOR);
    this.userService.setRoles(roles);
  }
}
