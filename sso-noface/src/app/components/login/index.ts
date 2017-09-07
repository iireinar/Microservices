import * as _ from "lodash";

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './component.html'
})

export class LoginComponent implements OnInit {

  private subscription: Subscription;

  form:FormGroup;
  showView:boolean=false;

  constructor(private userService:UserService,private formBuilder:FormBuilder,private messagesService:MessagesService,private router:Router,private activatedRoute:ActivatedRoute){
    this.initForm();
  }

  private initForm(){
    this.form = this.formBuilder.group({username: null,password: null,client_id: null,response_type: null,state: null});
  }
  
  doLogin() {
    this.messagesService.operationClear();

    this.userService.login(this.form.value)
      .then(res=>{
        window.location.href = res.customInfo;
      })
      .catch(err=>{
        let jsonErr=err.json();

        if(_.has(jsonErr,'status')&&jsonErr.status==='client_error')
          this.showView=false;
      });
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.form.patchValue({client_id:param['client_id']});
        this.form.patchValue({response_type:param['response_type']});
        this.form.patchValue({state:param['state']});
        this.form.patchValue({username:param['username']});
     });

    if(!this.form.value.client_id||!this.form.value.response_type){
      this.messagesService.errorMessage('Invalid login parameters.');
    } else {
      this.showView=true;
    }

    if(this.form.value.username){
      this.messagesService.success('User registered. Now please sign in!');
    }
  }

  register() {
    let queryParams = {client_id:this.form.value.client_id,response_type:this.form.value.response_type,state:this.form.value.state};
    this.router.navigate(['/register'],{queryParams:queryParams});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
