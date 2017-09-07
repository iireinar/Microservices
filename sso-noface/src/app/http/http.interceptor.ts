import { Injectable } from "@angular/core";
import { Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response } from "@angular/http";
import { Observable, Observer } from 'rxjs/Rx';

import { MessagesService } from '../services/messages.service';
import { MessagesOperations } from '../enums/messages.operations.enum';

@Injectable()
export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,private messagesService:MessagesService) {
      super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  private intercept(observable: Observable<Response>): Observable<Response> {
    return observable
      .catch(err=>{
        this.messagesService.error(err);

        return Observable.throw(err);
      });
  }
}
