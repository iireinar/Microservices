import { Component, Input, Provider, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractValueAccessor } from '../abstract.value.accessor';


const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DefaultInputComponent),
  multi: true
};

@Component({
  selector : 'default-input',
  templateUrl: './component.html',
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})

export class DefaultInputComponent extends AbstractValueAccessor {
  @Input() label:string=null;
  @Input() readOnly:boolean=false;
}
