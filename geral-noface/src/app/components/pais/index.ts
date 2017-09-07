import { Component, Injector } from '@angular/core';

import { BaseCrudList } from '../base.crud.list';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../model/pais';
import { LINKS } from '../links';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class PaisComponent extends BaseCrudList<Pais> {

  constructor(private paisService:PaisService,private injector:Injector) {
    super(LINKS.PAIS,paisService,injector);
  }

  protected generateForm():any {
    return {codigo: null,nome: null};
  }

  protected columnsValueTable():string[] {
    return ['id','codigo','nome'];
  }

  protected columnsTable():string[] {
    return ['Id','C\u00f3digo','Nome'];
  }

}
