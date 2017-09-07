import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import { HandleResponse } from '../http/handle.response';

@Injectable()
export class AppConf extends HandleResponse {

  private static CONFIG_DEV = 'assets/conf/dev.json';
  private static CONFIG_PROD = 'assets/conf/prod.json';

  private confData;

  constructor(private http:Http) {super(false,null);}

  load() : Promise<any> {
    let configFile = environment.production ? AppConf.CONFIG_PROD : AppConf.CONFIG_DEV;

    return this.get(configFile,super.extractData)
         .then(data=>{
           this.confData = data;
         })
         .catch(err=>{
           console.info(err);
           throw new Error('Error loading configurations...');
         })
  }

  protected get(url,extractData) {
    return this.http.get(url).toPromise().then(super.extractData);
  }

  getData() {
    return this.confData;
  }

}
