import * as _ from "lodash";

import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Subscription } from 'rxjs';

import { BaseCrud } from './base.crud';
import { BaseCrudService } from '../services/base.crud.service';
import { BaseModel } from '../model/base.model';

export abstract class BaseCrudEdit<T extends BaseModel> extends BaseCrud<T> implements OnInit, OnDestroy {

  isEdit:boolean = false;
  isNew:boolean = false;
  notFound:boolean = false;
  showView:boolean = false;
  entity:T;
  entityId:number;
  subscription:Subscription;
  showInsertMessage:boolean=false;

  constructor(links:{},service:BaseCrudService<T>,injector:Injector) {
    super(links,service,injector);
  }


  ngOnInit() {
    this.entityId = +this.activatedRoute.snapshot.params['id'];

    this.subscription = this.activatedRoute
      .queryParams.subscribe(params => {
        this.showInsertMessage = params['showInsertMessage'] || false;
      });

    if(!this.entityId) {
      this.isNew=true;
      this.showNew=false;
      this.showView=true;
      this.showDelete=false;

      this.initializeForm();
    } else {
      this.isEdit=true;

      this.initializeForm();
      this.loadEntity();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clear() {
    super.clear();

    if(this.isEdit) this.loadEntity()
  }

  loadEntity() {
    this.service.findOne(this.entityId)
          .then((entity:T)=>{
              this.entity=entity;
              this.showView=true;

              this.updateFormValues();
              
              if(this.showInsertMessage) {
                this.showInsertMessage=false;
                super.showSuccessMessage("Registro inserido com sucesso.");
              }
          }).catch(err=>{this.notFound=true});

  }

  delete() {
    this.service.delete(this.entity)
        .then((entity:T)=>{
          this.showSuccessMessage("Registro: " + entity.id + " excluído com sucesso.");
          this.showView=false;
        }).catch(err=>{});
  }

  store() {
    if (this.isEdit)
      this.service.update(this.form.value)
          .then((entity:T) => {
            this.entity = entity;
            this.updateFormValues();
            super.showSuccessMessage("Registro alterado com sucesso.");
          })
          .catch(err=>{});
    else          
      this.service.insert(this.form.value)
          .then((entity:T) => {
            this.entity = entity;
            this.edit(this.entity,{showInsertMessage:true});
          })
          .catch(err=>{});    
  }

  protected abstract updateFormValues();

}


  
