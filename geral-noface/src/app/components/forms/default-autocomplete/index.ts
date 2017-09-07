declare var jQuery: any;

import * as _ from "lodash";

import { Http } from "@angular/http";
import { Component, Input, EventEmitter, Output, OnChanges } from "@angular/core";

import { Session } from '../../../security/session';
import { generateCustomRequestOptions } from '../../../http/generate.request.options';

@Component({
  selector : 'default-autocomplete',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})

export class DefaultAutocomplete implements OnChanges {

  @Input() label:string;
  @Input() urlSource:string;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() target:any;
  @Input() inputEl:string;

  showList:boolean=false;
  isLoading:boolean=false;
  noDataFound:boolean=false;
  error:boolean=false;
  data:any[];
  hasData:boolean=false;
  inputValue:string;
  itemIndex:number=-1;
  hasSelected:boolean=false;

  constructor(private http:Http,private session:Session){}

  private isValidSearchTerm(searchTerm:string):boolean{
    return !_.isEmpty(searchTerm)&&searchTerm.length>=1;
  }

  private prepareData(data:any[]):void{
    this.data = new Array();

    data.forEach(row=>{
      let entity = new Object();
      
      entity['ORIGINAL_ENTITY']=row;
      entity['EL_EXPRESSION']=this.generateElValue(row);

      this.data.push(entity);
    });
  }

  private generateElValue(row:any):string{
    let elValue:string='';
    let els:string[]=this.inputEl.split('/');
    let elsLength = els.length;
    let count:number=0;

    els.forEach(el=>{
      elValue+=_.get(row,el);
      count++;
      if(elsLength>count)elValue+=' - '
    })

    return elValue;
  }

  private loadData(searchTerm:string) {
    this.clearData();

    if(this.isValidSearchTerm(searchTerm)){
      this.showList=true;
      this.isLoading=true;  

      this.http.get(this.urlSource+'/'+searchTerm,generateCustomRequestOptions(null,this.session.getToken()))
               .toPromise()
               .then(res=>{
                 let data = res.json() || { };
                 this.isLoading=false;

                 if(_.isEmpty(data)){
                   this.selectOne(null,false);
                   this.noDataFound=true;
                 } else {
                   this.hasData=true;
                   this.prepareData(data);
                   this.noDataFound=false;
                 }
               })
               .catch(err=>{
                 this.isLoading=false;
                 this.error=true;
               });
    } else 
      this.showList=false;
  }

  private clearData(executeSelect:boolean=true) {
    this.itemIndex=-1;
    this.hasData=false;
    this.data=null;

    if(executeSelect)
      this.selectOne(null,false);
  }

  private hide() {
    this.showList=false;
    this.isLoading=false;
    this.noDataFound=false;
    this.error=false;
    this.hasData=false;
  }

  private delay = (function () {
    let timer = 0;
    return function (callback: any, ms: number) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  ngOnChanges() {
    if(this.hasSelected&&!this.target){
      this.hasSelected=false;
      this.inputValue=null;
      this.clearData(false);
    } else if(this.target) {
      this.updateInputValue(this.target);
      this.hasSelected=true;
    }
  }

  mouseOverEvent(index:number) {
    this.itemIndex=index;
  }

  private scroll() {
    let height=jQuery('.default-autocomplete>ul>li').css('height').replace('px','');

    jQuery('.default-autocomplete>ul').scrollTop(this.itemIndex*height);
  }

  private updateInputValue(row:any){
    let value=null;

    if(row) {
      if(_.has(row,'EL_EXPRESSION')) value=row['EL_EXPRESSION']
      else value=this.generateElValue(row);
    }
    
    this.inputValue=value;
  }

  selectOne(row:any,uiUpdate:boolean=true){
    if(uiUpdate) {
      this.hide();
      this.updateInputValue(row);
    }     


    if(this.hasSelected||row){
      let entity=null;

      if(row) entity=row['ORIGINAL_ENTITY'];
      
      this.onSelect.emit(entity);
      this.hasSelected=row!=null;
    }
  }

  keyEvents(event:any):void {
    switch(event.keyCode){
      case 27 : // ESC
        this.hide();
        event.preventDefault();        
        break;
      case 38 : // UP
        if(this.hasData&&this.itemIndex>0) {
          this.itemIndex-=1;
          this.scroll();        
        }
        event.preventDefault();          
        break;
      case 40 : // DOWN
        if(this.hasData&&this.data.length-1>this.itemIndex){
          this.itemIndex+=1;
          this.scroll();
        }
        event.preventDefault();          
        break;
      case 13 : // ENTER WINDOWS-LINUX
      case 10 :
        if(this.hasData&&this.itemIndex>=0)
          this.selectOne(this.data[this.itemIndex])
        event.preventDefault();          
        break;
    }
  }

  blurEvent() {
    if(!this.hasSelected)this.updateInputValue(null);

    this.hide();
  }

  inputEvent(event):void {
    let searchTerm:string = event.target.value;
    let ms = this.isValidSearchTerm(searchTerm) ? 500 : 0;

    this.delay(() => this.loadData(searchTerm), ms);
  }

}
