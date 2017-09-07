import { BaseModel } from './base.model';

export class User extends BaseModel {
  username: string,
  password: string,
  confirm_password: string,
  email: string
}
