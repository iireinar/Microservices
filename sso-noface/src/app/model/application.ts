import { BaseModel } from './base.model';

export class Application extends BaseModel {
  name: string,
  return_url: string,
  client_id: string,
  client_secret: string
}
