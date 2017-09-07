import { Component, Injector } from '@angular/core';

import { BaseCrudList } from '../base.crud.list';
import { UnidadeFederativaService } from '../../services/unidade.federativa.service';
import { MunicipioService } from '../../services/municipio.service';
import { UnidadeFederativa } from '../../model/unidade.federativa';
import { Municipio } from '../../model/municipio';
import { LINKS } from '../links';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class MunicipioComponent extends BaseCrudList<Municipio> {

  ufSource:string;
  targetUf:UnidadeFederativa;

  constructor(unidadeFederativaService:UnidadeFederativaService,municipioService:MunicipioService,injector:Injector) {
    super(LINKS.MUNICIPIO,municipioService,injector);

    this.ufSource=unidadeFederativaService.getUrl(UnidadeFederativaService.CUSTOM_OPERATIONS.FIND_NAME);
  }

  protected generateForm():any {
    return {nome: null,unidadeFederativa:null};
  }

  protected columnsValueTable():string[] {
    return ['id','nome','unidadeFederativa.nome'];
  }
  
  protected columnsTable():string[] {
    return ['Id','Nome', 'Unidade Federativa'];
  }

  protected beforeOnInitSearch():void{
    let control = this.form.controls['unidadeFederativa'];
    
    if(control) this.targetUf=control.value;
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
