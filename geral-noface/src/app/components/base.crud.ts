import * as _ from "lodash";

import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { BaseComponent } from './base.component';
import { MessagesService } from '../services/messages.service';
import { BaseModel } from '../model/base.model';
import { MessagesOperations } from '../enums/messages.operations.enum';
import { BaseCrudService } from '../services/base.crud.service';

export abstract class BaseCrud<T extends BaseModel> extends BaseComponent {

  protected activatedRoute;
  protected router:Router;
  protected formBuilder:FormBuilder;
  protected messagesService:MessagesService;
  protected url:string;

  showDelete:boolean=true;
  showList:boolean=true;
  showNew:boolean=true;
  form:FormGroup;

  constructor(private links:{},protected service:BaseCrudService<T>, injector:Injector) {
    super();

    this.links=links;
    this.service=service;
    this.formBuilder=injector.get(FormBuilder);
    this.messagesService=injector.get(MessagesService);
    this.router=injector.get(Router);
    this.activatedRoute=injector.get(ActivatedRoute);

    this.url=this.router.url;
  }

  protected abstract generateForm():any;

  protected clear() {
    this.clearMessages();
    this.form.reset();
  }

  protected showSuccessMessage(message:string) {
    this.messagesService.success(message);
  }

  protected showAlertMessage(message:string) {
    this.messagesService.alert(message);
  }

  protected initializeForm() {
    this.form = this.formBuilder.group(this.generateForm());
  }

  protected clearMessages() {
    this.messagesService.operation(MessagesOperations.CLEAR);
  }

  list() {
    this.router.navigate([this.links['list']]);
  }

  edit(entity:T,queryParams:{}=null) {
    this.router.navigate([this.links['edit']+entity.id], {queryParams:queryParams});
  }

  newRegister() {
    this.router.navigate([this.links['newRegister']]);
  }

}
