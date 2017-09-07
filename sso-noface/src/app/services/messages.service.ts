import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from "rxjs/Rx";

import { MessagesOperations } from '../enums/messages.operations.enum';

@Injectable()
export class MessagesService {

  private errorMessageSource:Subject<string> = new Subject<string>();
  private errorSource:Subject<Response> = new Subject<Response>();
  private successSource:Subject<string> = new Subject<string>();
  private operationSource:Subject<MessagesOperations> = new Subject<MessagesOperations>();
  private alertSource:Subject<string> = new Subject<string>();

  errorMessageObservable = this.errorMessageSource.asObservable();
  errorObservable = this.errorSource.asObservable();
  operationsObservable = this.operationSource.asObservable();
  successObservable = this.successSource.asObservable();
  alertObservable = this.alertSource.asObservable();

  error(err:Response) {
    this.errorSource.next(err);
  }

  errorMessage(message:string) {
    this.errorMessageSource.next(message);
  }

  operationClear() {
    this.operation(MessagesOperations.CLEAR);
  }
  
  operation(operation:MessagesOperations) {
    this.operationSource.next(operation);
  }

  success(message:string) {
    this.successSource.next(message);
  }

  alert(message:string) {
    this.alertSource.next(message);
  }

}
