import { Injector } from '@angular/core';

import { BaseModel } from '../model/base.model';
import { BaseService } from './base.service';
import { MessagesService } from './messages.service';
import { MessagesOperations } from '../enums/messages.operations.enum';
import { Urls } from '../enums/urls.enum';
import { AppUrls } from '../conf/app.urls';

export abstract class BaseCrudService<T extends BaseModel> extends BaseService {

  private static CRUD_OPERATIONS = {INSERT:'', UPDATE:'',DELETE:'',FIND_ONE:'',FIND_EXAMPLE:'/find'};

  private appUrls:AppUrls;
  private messagesService:MessagesService;

  constructor(private serviceUrl:Urls,injector:Injector) {
    super(true,injector); 
   
    this.appUrls=injector.get(AppUrls);
    this.messagesService=injector.get(MessagesService);
  }

  private initLoader() {
    this.messagesService.operation(MessagesOperations.BEGIN_LOADING);
  }
  
  insert(entity:T) : Promise<T> {
    this.initLoader();

    return super.put(this.getUrl(BaseCrudService.CRUD_OPERATIONS.UPDATE),entity);
  }

  update(entity:T) : Promise<T> {
    this.initLoader();

    return super.post(this.getUrl(BaseCrudService.CRUD_OPERATIONS.UPDATE),entity);
  }

  findOne(id:number) : Promise<T> {
    this.initLoader();

    return super.get(this.getRestUrl(BaseCrudService.CRUD_OPERATIONS.FIND_ONE,id));
  }

  findExample(entity:T) : Promise<T[]> {
    this.initLoader();

    return super.post(this.getUrl(BaseCrudService.CRUD_OPERATIONS.FIND_EXAMPLE),entity);
  }

  delete(entity:T){
    this.initLoader();
    
    return super.delete(this.getUrl(BaseCrudService.CRUD_OPERATIONS.DELETE),entity);
  }

  private getRestUrl(operation:string,param:any) : string { 
    return this.appUrls.getRestUrl(this.getUrl(operation),param);
  }

  getUrl(operation:string) : string {
    return this.appUrls.getUrl(this.serviceUrl) + operation;
  }

}
