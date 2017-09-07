import { Component } from '@angular/core';

import { Session } from '../../security/session';

@Component({
  selector: 'app-header',
  templateUrl: './component.html'
})

export class HeaderComponent {

  constructor(private session:Session){}
  
}
