import {UserRolModel} from './UserRol.model';

export class UserModel {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRolModel[];
}
