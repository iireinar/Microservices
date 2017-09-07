import { Component } from '@angular/core';

import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class ClientErrorComponent {

  constructor(private messagesService:MessagesService){
    this.messagesService.errorMessage('Invalid client info.')
  }

}
