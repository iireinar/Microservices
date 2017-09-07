import { Component, Injector } from '@angular/core';

import { BaseCrudEdit } from '../../base.crud.edit';
import { UnidadeFederativaService } from '../../../services/unidade.federativa.service';
import { PaisService } from '../../../services/pais.service';
import { UnidadeFederativa } from '../../../model/unidade.federativa';
import { Pais } from '../../../model/pais';
import { LINKS } from '../../links';



@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class UnidadeFederativaEditComponent extends BaseCrudEdit<UnidadeFederativa> {

  paisSource:string;
  targetPais:Pais;

  constructor(unidadeFederativaService:UnidadeFederativaService,paisService:PaisService,injector:Injector) {
    super(LINKS.UNIDADE_FEDERATIVA,unidadeFederativaService,injector);

    this.paisSource=paisService.getUrl(PaisService.CUSTOM_OPERATIONS.FIND_NAME);
  }

  protected generateForm():any {
    return {id:null,codigo: null,nome: null,pais:null};
  }

  protected updateFormValues() {
    this.form.patchValue({id:this.entity.id});
    this.form.patchValue({codigo:this.entity.codigo});
    this.form.patchValue({nome:this.entity.nome});
    this.form.patchValue({pais:this.entity.pais});
    
    this.targetPais=this.entity.pais;
  }

  paisSelect(pais:Pais) :void {
    this.targetPais=pais;
    this.form.patchValue({pais:pais});
  }

  clear() {
    super.clear();
    this.targetPais=null;
  }

}
