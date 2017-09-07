import { Injectable, Injector } from '@angular/core';

import { Pais } from '../model/pais';
import { BaseCrudService } from './base.crud.service';
import { Urls } from '../enums/urls.enum';

@Injectable()
export class PaisService extends BaseCrudService<Pais> {

  static CUSTOM_OPERATIONS = {FIND_NAME:'/nome'};
  
  constructor(injector:Injector) {
    super(Urls.PAIS,injector);
  }
  
}
