import { Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HandleResponse } from '../http/handle.response';
import { Session } from '../security/session';
import { generateCustomRequestOptions } from '../http/generate.request.options';

export abstract class BaseService extends HandleResponse {

  private http:Http;
  private session:Session;

  constructor(loader:boolean=false,injector:Injector) {
    super(loader,injector);

    this.http=injector.get(Http);
    this.session=injector.get(Session);
  }

  protected generateRequestOptions(bodyData=null) : RequestOptions {
    return generateCustomRequestOptions(bodyData,this.session.getToken());
  }

  protected put(url,data) {
    return this.http.put(url,data,this.generateRequestOptions()).toPromise().then(super.extractData);
  }

  protected delete(url,data) {
    return this.http.delete(url,this.generateRequestOptions(data)).toPromise().then(super.extractData);
  }

  protected post(url,data) {
    return this.http.post(url,data,this.generateRequestOptions()).toPromise().then(super.extractData);
  }

  protected get(url) {
    return this.http.get(url,this.generateRequestOptions()).toPromise().then(super.extractData);
  }

}
