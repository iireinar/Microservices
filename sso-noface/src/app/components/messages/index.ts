import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from "rxjs/Rx";
import { List } from 'immutable';

import { MessagesService } from '../../services/messages.service';
import { MessagesOperations } from '../../enums/messages.operations.enum';
import { ErrorCode } from '../../enums/error.code.enum';

@Component({
  selector: 'app-messages',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})

export class MessagesComponent implements OnInit {

  private errorStatus = List.of(404,403,0,500);
  private errorSubscription: Subscription;
  private errorMessageSubscription: Subscription;
  private successSubscription: Subscription;
  private operationSubscription: Subscription;
  private alertSubscription: Subscription;

  error:boolean = false;
  success:boolean = false;
  loading:boolean = false;
  alert:boolean = false;
  message:string;

  constructor(private messagesService:MessagesService) {}

  ngOnInit() {
    this.errorSubscription = this.messagesService.errorObservable.subscribe((err:Response) => this.handleError(err));
    this.errorMessageSubscription = this.messagesService.errorMessageObservable.subscribe((message:string) => this.handleErrorMessage(message));
    this.successSubscription = this.messagesService.successObservable.subscribe((message:string) => this.handleSuccess(message));
    this.alertSubscription = this.messagesService.alertObservable.subscribe((message:string) => this.handleAlert(message));
    this.operationSubscription = this.messagesService.operationsObservable.subscribe((operation:MessagesOperations) => this.handleOperation(operation));
  }

  private handleOperation(operation:MessagesOperations) {
    if(operation === MessagesOperations.CLEAR) this.hide();
    else if (operation === MessagesOperations.END_LOADING) this.loading = false;
    else if (operation === MessagesOperations.BEGIN_LOADING) { this.loading = true; }
  }

  private handleError(error:Response) {
    let errorStatus = error.status;
    let message = "Error consulting server.";

    if (error instanceof Response && ! this.errorStatus.contains(errorStatus)) {
        let errorJson = error.json();

        if ( (<any>ErrorCode)[errorJson.code] === ErrorCode.ConstraintViolationException ) {
          message = "Data integrity violation. Cannot execute operation.";
        } else message = errorJson.message;
    }

    this.handleErrorMessage(message);
  }

  private handleErrorMessage(message:string) {
    this.hide();

    this.message = message;
    this.error = true;
  }

  private handleSuccess(message:string) {
    this.hide();

    this.message = message;
    this.success = true;
  }

  private handleAlert(message:string) {
    this.hide();

    this.message = message;
    this.alert = true;
  }

  hide() {
    this.error = false;
    this.loading = false;
    this.success = false;
    this.alert = false;
  }

  ngOnDestroy() {
    this.errorMessageSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.successSubscription.unsubscribe();
    this.operationSubscription.unsubscribe();
    this.alertSubscription.unsubscribe();
  }

}
