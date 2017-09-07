import { Injectable } from '@angular/core';
import { Urls } from '../enums/urls.enum';
import { AppConf } from './app.conf';

@Injectable()
export class AppUrls {

  constructor(private appConf:AppConf) {}

  getUrl(url:Urls) : string {
    return this.get(Urls.BASE_URL) + this.get(url);
  }

  getRestUrl(url:string,param:any) : string {
    let urlT = url+'/'+param.toString();
    
    return urlT;
  }

  getQueryStringUrl(url:Urls,params:any[]) : string {
      let urlString = this.getUrl(url);

      urlString+='?';

      for(let param in params) {
        urlString+=param+'='+params[param]+'&'
      }

      return urlString;
  }

  private get(url:Urls) : string{
    return this.appConf.getData()[Urls[url]];
  }
}
