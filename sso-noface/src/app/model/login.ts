import { BaseModel } from './base.model';

export class Login extends BaseModel {
  username: string,
  password: string,
  client_id: string,
  response_type: string,
  state: string  
}