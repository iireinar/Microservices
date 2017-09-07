import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ViewStateHolder {

  url:string;
  form:FormGroup;
  hasData:boolean;

  updateLastView(url:string,form:FormGroup,hasData:boolean) {
    this.url=url;
    this.form=form;
    this.hasData=hasData;
  }

  clearLastView() {
    this.url=null;
    this.form=null;
    this.hasData=null;
  }
 
}
