import { Component, Injector } from '@angular/core';

import { BaseCrudList } from '../base.crud.list';
import { UnidadeFederativaService } from '../../services/unidade.federativa.service';
import { PaisService } from '../../services/pais.service';
import { UnidadeFederativa } from '../../model/unidade.federativa';
import { Pais } from '../../model/pais';
import { LINKS } from '../links';



@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class UnidadeFederativaComponent extends BaseCrudList<UnidadeFederativa> {

  paisSource:string;
  targetPais:Pais;

  constructor(unidadeFederativaService:UnidadeFederativaService,paisService:PaisService,injector:Injector) {
    super(LINKS.UNIDADE_FEDERATIVA,unidadeFederativaService,injector);

    this.paisSource=paisService.getUrl(PaisService.CUSTOM_OPERATIONS.FIND_NAME);
  }

  protected generateForm():any {
    return {codigo: null,nome: null,pais:null};
  }

  protected columnsValueTable():string[] {
    return ['id','codigo','nome','pais.nome'];
  }
  
  protected columnsTable():string[] {
    return ['Id','C\u00f3digo','Nome', 'Pa\u00eds'];
  }

  protected beforeOnInitSearch():void{
    let paisControl = this.form.controls['pais'];
    
    if(paisControl) this.targetPais=paisControl.value;
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
