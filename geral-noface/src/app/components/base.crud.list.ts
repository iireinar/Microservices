import * as _ from "lodash";

import { Component, OnInit, Injector } from '@angular/core';

import { BaseCrud } from './base.crud';
import { BaseCrudService } from '../services/base.crud.service';
import { BaseModel } from '../model/base.model';
import { ViewStateHolder } from './view.state.holder';

export abstract class BaseCrudList<T extends BaseModel> extends BaseCrud<T> implements OnInit {

  private viewStateHolder:ViewStateHolder;

  columns:string[];
  columnsValue:string[];
  data:T[];
  hasData:boolean=false;

  constructor(links:{},service:BaseCrudService<T>,injector:Injector) {
    super(links,service,injector);

    this.viewStateHolder=injector.get(ViewStateHolder);
    this.columns=this.columnsTable();
    this.columnsValue=this.columnsValueTable();
    this.showList=false;
    this.showDelete=false;

    this.initializeForm();
  }

  ngOnInit() {
    if(this.viewStateHolder.url===this.url){
      this.form=this.viewStateHolder.form;

      this.beforeOnInitSearch();
      
      if(this.viewStateHolder.hasData) this.findExample(true);
    } else {
      this.viewStateHolder.clearLastView();
    }
  }

  delete(entity:T) {
    this.service.delete(entity)
        .then((entity:T)=>{
          this.showSuccessMessage("Registro: " + entity.id + " excluído com sucesso.");
          this.findExample(false);
        }).catch(err=>{});
  }

  findExample(clearMessages:boolean=true) {
    this.data = null;

    if(clearMessages) super.clearMessages();

    this.service.findExample(this.form.value)
        .then((data:T[]) => {
          this.hasData = !_.isEmpty(data);
          this.data = data;

          if (!this.hasData) this.showAlertMessage("Nenhum registro encontrado.");
        }).catch(err=>{});
  }

  clear() {
    super.clear();

    this.data = null;
    this.hasData = false;
  }

  edit(entity:T,queryParams:{}=null) {
    this.saveViewState();

    super.edit(entity,queryParams);
  }

  newRegister() {
    this.saveViewState();

    super.newRegister();
  }

  private saveViewState() {
    this.viewStateHolder.updateLastView(this.url,this.form,this.hasData);
  }

  protected beforeOnInitSearch():void{}

  protected abstract columnsTable():string[];

  protected abstract columnsValueTable():string[];

}
