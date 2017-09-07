import {Headers, Http, BaseRequestOptions} from '@angular/http';

export class HttpHeaders extends BaseRequestOptions {

  constructor () {
    super();
    
    this.headers.append('Content-Type','application/json');
  }

}
