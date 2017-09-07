import { Injector } from '@angular/core';
import { Response } from '@angular/http';

import { MessagesOperations } from '../enums/messages.operations.enum';
import { MessagesService } from '../services/messages.service';

export abstract class HandleResponse {

  private static loader:boolean;
  private static messagesService:MessagesService;

  constructor(private loader:boolean=false,injector:Injector=null) {
    HandleResponse.loader = loader;

    if(injector)
      HandleResponse.messagesService = injector.get(MessagesService);

  }

  private static notifyLoader() {
    if ( HandleResponse.loader )
      HandleResponse.messagesService.operation(MessagesOperations.END_LOADING);
  }

  protected extractData(res: Response) {
    HandleResponse.notifyLoader();

    return res.json() || { };
  }

}
