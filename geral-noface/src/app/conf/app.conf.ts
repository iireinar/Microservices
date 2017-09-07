import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AppConf {

  private static ASSETS_CONF:string='assets/conf/';
  private static CONFIG_DEV:string=AppConf.ASSETS_CONF+'dev.json';
  private static CONFIG_PROD:string=AppConf.ASSETS_CONF+'prod.json';

  private confData;

  constructor(private http:Http) {}

  load() : Promise<any> {
    let configFile = environment.production ? AppConf.CONFIG_PROD : AppConf.CONFIG_DEV;

    return this.get(configFile)
         .then(res=>{
           this.confData = res.json();
         })
         .catch(err=>{
           throw new Error('Error loading configurations...');
         })
  }

  protected get(url) {
    return this.http.get(url).toPromise();
  }

  getData() {
    return this.confData;
  }

}
