import { Injectable, Injector } from '@angular/core';

import { UnidadeFederativa } from '../model/unidade.federativa';
import { BaseCrudService } from './base.crud.service';
import { Urls } from '../enums/urls.enum';

@Injectable()
export class UnidadeFederativaService extends BaseCrudService<UnidadeFederativa> {

  static CUSTOM_OPERATIONS = {FIND_NAME:'/nome'};
  
  constructor(injector:Injector) {
    super(Urls.UNIDADE_FEDERATIVA,injector);
  }
  
}
