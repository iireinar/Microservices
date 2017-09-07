import * as _ from "lodash";

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';

import { ApplicationService } from '../../services/application.service';
import { MessagesService } from '../../services/messages.service';
import { Application } from '../../model/application';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class ApplicationComponent {

  showEdit:boolean=false;
  data:Application[];
  hasData:boolean=false;
  form:FormGroup;
  columns:string[]=['Name','Client ID','Client Secret','Return Url'];
  columnsValue:string[]=['name','client_id','client_secret','return_url'];

  constructor(private formBuilder:FormBuilder, private applicationService:ApplicationService, private messagesService:MessagesService,private http:Http) {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({name: null,return_url: null});  
  }

  insert() {
    this.messagesService.operationClear();
    
    this.applicationService
        .insert(this.form.value)
        .then(res => {
          this.form.reset();         
          this.messagesService.success(res.message);

          if(this.hasData)
            this.loadData();
        }).catch(err=>{});

  }

  delete(application:Application) {
    this.messagesService.operationClear();

    this.applicationService
        .delete(application)
        .then(res=>{this.loadData()})
        .catch(err=>{});
  }

  loadData() {
    this.messagesService.operationClear();

    this.data = null;
    this.hasData = false;

    this.applicationService
        .find()
        .then((data:Application[])=> {
          this.data = data;

          if (!_.isEmpty(data)) this.hasData = true;
          else this.messagesService.errorMessage('No data found.')
        });
  }

}
