import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Login } from '../model/login';
import { User } from '../model/user';
import { BaseService } from './base.service';
import { Urls } from '../enums/urls.enum';
import { AppUrls } from '../conf/app.urls';

@Injectable()
export class UserService extends BaseService {

  static OPERATIONS = {LOGIN:'/login',REGISTER:''};

  private serviceUrl:Urls;

  constructor(private appUrls:AppUrls,injector:Injector) {
    super(true,injector);

    this.serviceUrl = Urls.USER;
  }

  login(login:Login) : Promise<any> {
    return super.post(this.getUrl(UserService.OPERATIONS.LOGIN),login);
  }

  register(user:User) : Promise<User> {
    return super.post(this.getUrl(UserService.OPERATIONS.REGISTER),user);
  }

  getUrl(operation:string) : string {
    return this.appUrls.getUrl(this.serviceUrl) + operation;
  }
}
