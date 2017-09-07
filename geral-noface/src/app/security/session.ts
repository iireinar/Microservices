import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AppConf } from '../conf/app.conf';
import { UnsecuredUrls } from './unsecured.urls';
import { AppUrls } from '../conf/app.urls';


@Injectable()
export class Session {

  private ssoLoginUrl:string;
  private ssoClientId:string;
  private ssoValidateTokenUrl:string;
  private ssoSessionAuthorizeUrl:string;
  private responseType:string='TOKEN';
  private data:any;
  private state:string;

  isLoggedIn:boolean=false;
  
  constructor(private appConf:AppConf,private cookieService:CookieService,private appUrls:AppUrls,private http:Http,private router:Router){
    this.ssoLoginUrl=this.appConf.getData().SSO_LOGIN_URL;
    this.ssoClientId=this.appConf.getData().SSO_CLIENT_ID;
    this.ssoValidateTokenUrl=this.appConf.getData().SSO_VALIDATE_TOKEN;
    this.ssoSessionAuthorizeUrl=this.appConf.getData().SSO_SESSION_AUTHORIZE;
  }

  redirectToState() {
    if(!this.state) this.state='/'

    this.router.navigate([this.state]);
  }

  setState(state:string){
    this.state=state;
  }

  handle(url:string):void{
    if(this.isLoggedIn) return;

    if(url.indexOf('?')>0){
      url = url.substr(0,url.indexOf('?'));
    }

    if(!UnsecuredUrls.contains(url)){
      this.redirectToAuthorize(url);
    }
  }

  redirectToLogin(state:string) {
    window.location.href=this.generateSSOUrlLogin(state);
  }

  redirectToAuthorize(state:string) {
    window.location.href=this.generateSSOUrlSessionAuthorize(state);
  }
  
  validateToken(token:string):Promise<any> {
    return this.http
        .post(this.ssoValidateTokenUrl,{token:token}).toPromise()
        .then(res=>{
          this.data=res.json();
          this.isLoggedIn=true;

          return this.data;
        })
        .catch(err=>{
          this.isLoggedIn=false;
          this.cookieService.removeAll();
          
          return Promise.reject(err);
        })
  }

  getToken():string{
    return this.data.token;
  }
  
  private generateSSOParams(state:string){
    return {'client_id':this.ssoClientId,'response_type':this.responseType,'state':state};
  }

  private generateSSOUrl(url:string,state:string) {
    return this.appUrls.queryStringUrl(url,this.generateSSOParams(state));
  }

  private generateSSOUrlSessionAuthorize(state:string){
    return this.generateSSOUrl(this.ssoSessionAuthorizeUrl,state);
  }

  private generateSSOUrlLogin(state:string):string {
    return this.generateSSOUrl(this.ssoLoginUrl,state);
  }

}
