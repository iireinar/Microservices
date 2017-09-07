import { Component, Injector } from '@angular/core';

import { BaseCrudEdit } from '../../base.crud.edit';
import { UnidadeFederativaService } from '../../../services/unidade.federativa.service';
import { MunicipioService } from '../../../services/municipio.service';
import { UnidadeFederativa } from '../../../model/unidade.federativa';
import { Municipio } from '../../../model/municipio';
import { LINKS } from '../../links';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class MunicipioEditComponent extends BaseCrudEdit<Municipio> {

  ufSource:string;
  targetUf:UnidadeFederativa;

  constructor(unidadeFederativaService:UnidadeFederativaService,municipioService:MunicipioService,injector:Injector) {
    super(LINKS.MUNICIPIO,municipioService,injector);

    this.ufSource=unidadeFederativaService.getUrl(UnidadeFederativaService.CUSTOM_OPERATIONS.FIND_NAME);
  }

  protected generateForm():any {
    return {id:null,nome:null,unidadeFederativa:null};
  }

  protected updateFormValues() {
    this.form.patchValue({id:this.entity.id});
    this.form.patchValue({nome:this.entity.nome});
    this.form.patchValue({unidadeFederativa:this.entity.unidadeFederativa});
    
    this.targetUf=this.entity.unidadeFederativa;
  }

  ufSelect(unidadeFederativa:UnidadeFederativa) :void {
    this.targetUf=unidadeFederativa;
    this.form.patchValue({unidadeFederativa:unidadeFederativa});
  }

  clear() {
    super.clear();
    this.targetUf=null;
  }

}
