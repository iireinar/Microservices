import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import { MessagesOperations } from '../../enums/messages.operations.enum';

@Component({
  selector: 'app-root',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  private subscription: Subscription;

  constructor(private router: Router,private messagesService:MessagesService) {}

  ngOnInit() {
    this.subscription = this.router.events.pairwise().subscribe((event) => this.handleNavigation(event));
  }

  ngAfterViewInit() {}

  private handleNavigation(event) {
    let navigationEvent = event[0];

    if ( navigationEvent instanceof NavigationStart ) {
      this.messagesService.operation(MessagesOperations.CLEAR);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
