import { Component } from '@angular/core';

import { Session } from '../../security/session';

@Component({
  selector: 'app-menu',
  templateUrl: './component.html'
})

export class MenuComponent {

  constructor(private session:Session){}
  
}
