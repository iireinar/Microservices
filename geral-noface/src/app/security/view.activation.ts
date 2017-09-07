import { Component, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Session } from './session';


@Injectable()
export class ViewActivation implements CanActivate {

  constructor(private session:Session){}

  canActivate() {
    return this.session.isLoggedIn;
  }

}
