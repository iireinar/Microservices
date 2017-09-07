import * as _ from "lodash";

import { Component, Input, EventEmitter, Output, OnChanges } from "@angular/core";

@Component({
  selector : 'default-datatable',
  templateUrl: './component.html'
})

export class DefaultDataTableComponent implements OnChanges {

  private static ORIGINAL_ENTITY = "original_entity";

  @Input() columns:string[];
  @Input() columnsValue:string[];
  @Input() data:Object[];
  @Input() hasData:boolean;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  resultData:any[];

  private prepareData() {
    let entity;

    this.resultData = new Array();

    this.data.forEach(row=>{
      entity = new Object();

      entity[DefaultDataTableComponent.ORIGINAL_ENTITY]=row;

      this.columnsValue.forEach(column=>{
        entity[column]=_.get(row,column);
      })

      this.resultData.push(entity);
    });
  }

  ngOnChanges(){
    if(!_.isEmpty(this.data)) this.prepareData();
    else this.resultData=null;
  }

  delete(row:any){
    this.onDelete.emit(row[DefaultDataTableComponent.ORIGINAL_ENTITY]);
  }

  edit(row:any){
    this.onEdit.emit(row[DefaultDataTableComponent.ORIGINAL_ENTITY]);
  }

}
