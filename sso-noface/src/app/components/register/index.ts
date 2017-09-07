import * as _ from "lodash";

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class RegisterComponent implements OnInit {

  private subscription:Subscription;
  private clientId:string;
  private responseType:string;
  private state:string;

  form:FormGroup;
  showView:boolean=false;

  constructor(private userService:UserService,private formBuilder:FormBuilder,private messagesService:MessagesService,private router:Router,private activatedRoute:ActivatedRoute){
    this.initForm();
  }

  private initForm(){
    this.form = this.formBuilder.group({username: null,password: null,confirm_password:null,email:null});
  }
  
  doRegister() {
    this.userService.register(this.form.value)
      .then((user:User)=>{
        this.messagesService.operationClear();
        this.login(user);
      })
      .catch(err=>{});
  }

  login(user:User) {
    let queryParams = {client_id:this.clientId,response_type:this.responseType,state:this.state,username:user.username};
    this.router.navigate(['/login'],{queryParams:queryParams});
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.clientId=param['client_id'];
        this.responseType=param['response_type'];
        this.state=param['state'];
     });

    if(!this.clientId||!this.responseType){
      this.messagesService.errorMessage('Invalid login parameters.');
    } else {
      this.showView=true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
