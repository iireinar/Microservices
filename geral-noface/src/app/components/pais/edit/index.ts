import { Component, Injector } from '@angular/core';

import { BaseCrudEdit } from '../../base.crud.edit';
import { PaisService } from '../../../services/pais.service';
import { Pais } from '../../../model/pais';
import { LINKS } from '../../links';


@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class PaisEditComponent extends BaseCrudEdit<Pais> {

  constructor(paisService:PaisService,private injector:Injector) {
    super(LINKS.PAIS,paisService,injector);
  }

  protected generateForm():any {
    return {id:null, codigo: null,nome: null};
  }
 
  protected updateFormValues() {
    this.form.patchValue({id:this.entity.id});
    this.form.patchValue({codigo:this.entity.codigo});
    this.form.patchValue({nome:this.entity.nome});
  }

}
