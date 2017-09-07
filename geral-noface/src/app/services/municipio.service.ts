import { Injectable, Injector } from '@angular/core';

import { Municipio } from '../model/municipio';
import { BaseCrudService } from './base.crud.service';
import { Urls } from '../enums/urls.enum';

@Injectable()
export class MunicipioService extends BaseCrudService<Municipio> {

  constructor(injector:Injector) {
    super(Urls.MUNICIPIO,injector);
  }
  
}
