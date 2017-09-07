import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Application } from '../model/application';
import { User } from '../model/user';
import { BaseService } from './base.service';
import { Urls } from '../enums/urls.enum';
import { AppUrls } from '../conf/app.urls';

@Injectable()
export class ApplicationService extends BaseService {

  static OPERATIONS = {FIND:'',INSERT:'',DELETE:''};

  private serviceUrl:Urls;

  constructor(private appUrls:AppUrls,injector:Injector) {
    super(true,injector);

    this.serviceUrl = Urls.APPLICATION;
  }

  find() : Promise<Application[]> {
    return super.get(this.getUrl(ApplicationService.OPERATIONS.FIND));
  }

  insert(application:Application) : Promise<any> {
    return super.post(this.getUrl(ApplicationService.OPERATIONS.INSERT),application);
  }

  delete(application:Application) : Promise<any>{
    return super.delete(this.getUrl(ApplicationService.OPERATIONS.DELETE),application);
  }

  getUrl(operation:string) : string {
    return this.appUrls.getUrl(this.serviceUrl) + operation;
  }
}
