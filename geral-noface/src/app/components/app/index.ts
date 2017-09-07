import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessagesService } from '../../services/messages.service';
import { MessagesOperations } from '../../enums/messages.operations.enum';
import { Session } from '../../security/session';
import { initializeJquery } from './initialize.jquery';

@Component({
  selector: 'app-root',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  private subscription: Subscription;

  constructor(private router: Router,private messagesService:MessagesService,private session:Session) {}

  ngOnInit() {
    this.subscription = this.router.events.pairwise().subscribe((event) => this.handleNavigation(event));
  }

  ngAfterViewInit() {
    initializeJquery();
  }
 
  private handleNavigation(event) {
    let navigationEvent = event[0];
    
    if ( navigationEvent instanceof NavigationStart ) {
      this.session.handle(navigationEvent.url);
      
      this.messagesService.operation(MessagesOperations.CLEAR);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
