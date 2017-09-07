import { Component } from '@angular/core';

import { Session } from '../../../security/session';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './component.html'
})

export class NavigationHeaderComponent {

  constructor(private session:Session){}
}
