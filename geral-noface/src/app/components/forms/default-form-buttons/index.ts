import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector : 'default-form-buttons',
  templateUrl: './component.html'
})

export class DefaultFormButtonsComponent {
  @Input() label:string;
  @Input() showList:boolean=false;
  @Input() showNew:boolean=true;
  @Input() showDelete:boolean=false;
  @Output() onClear:EventEmitter<any> = new EventEmitter();
  @Output() onList:EventEmitter<any> = new EventEmitter();
  @Output() onNew:EventEmitter<any> = new EventEmitter();
  @Output() onDelete:EventEmitter<any> = new EventEmitter();

  delete() {
    this.onDelete.emit();
  }

  newRegister() {
    this.onNew.emit();
  }

  list() {
    this.onList.emit();
  }

  clear() {
    this.onClear.emit();
  }
}
