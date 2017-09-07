import { Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HandleResponse } from '../http/handle.response';
import { MessagesService } from './messages.service';
import { MessagesOperations } from '../enums/messages.operations.enum';

export abstract class BaseService extends HandleResponse {

  private http:Http;
  private messagesService:MessagesService;
  private __loader:boolean=false;
  
  constructor(loader:boolean=false,injector:Injector) {
    super(loader,injector);

    this.http=injector.get(Http);

    if(loader) {
      this.messagesService=injector.get(MessagesService);
      this.__loader=loader;
    }
  }

  private initLoader() {
    if(this.__loader){
      this.messagesService.operation(MessagesOperations.BEGIN_LOADING);
    }
  }

  protected generateRequestOptions(bodyData=null) : RequestOptions {
    let headers;

    if(bodyData) headers = {body:bodyData};

    return new RequestOptions(headers);
  }

  protected put(url,data) {
    this.initLoader();

    return this.http.put(url,data).toPromise().then(super.extractData);
  }

  protected delete(url,data) {
    this.initLoader();

    return this.http.delete(url,this.generateRequestOptions(data)).toPromise().then(super.extractData);
  }

  protected post(url,data) {
    this.initLoader();

    return this.http.post(url,data).toPromise().then(super.extractData);
  }

  protected get(url) {
    this.initLoader();
    
    return this.http.get(url).toPromise().then(super.extractData);
  }

}
