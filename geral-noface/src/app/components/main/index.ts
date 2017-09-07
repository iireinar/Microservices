import { Component } from '@angular/core';

import { Session } from '../../security/session';

@Component({
  selector: 'app-main',
  templateUrl: './component.html'
})

export class MainComponent {

  constructor(private session:Session){}

}
