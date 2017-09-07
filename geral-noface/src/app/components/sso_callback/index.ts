import { Component, OnInit } from '@angular/core';

import { Session } from '../../security/session';
import { MessagesService } from '../../services/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class SSOCallbackComponent implements OnInit {

  private subscription:Subscription;
  private username:string;
  private token:string;
  private tokenType:string;
  private state:string;

  error:boolean=false;
  loading:boolean=true;

  constructor(private session:Session,private router:Router,private activatedRoute:ActivatedRoute,private messagesService:MessagesService){}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((param: any) => {
      this.username=param['username'];
      this.token=param['token'];
      this.tokenType=param['token_type'];
      this.state=param['state'];
    });

    if(!this.username||!this.token||!this.tokenType){
      this.loading=false;
      this.showError('Invalid login parameters.');
    } else {
      this.session.setState(this.state);
      this.validateLogin();
    }
  }

  private showError(message:string) {
    this.messagesService.errorMessage(message);
    this.error=true;
  }

  private validateLogin() {
    this.session
        .validateToken(this.token)
        .then(res=>{
          this.loading=false;
          this.session.redirectToState();
        })
        .catch(err=>{
          this.loading=false;
          this.error=true;
        });
  }

  login() {
    this.session.redirectToAuthorize(this.state);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
