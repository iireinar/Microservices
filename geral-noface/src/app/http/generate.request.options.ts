import { Http, Response, Headers, RequestOptions } from '@angular/http';

export function generateCustomRequestOptions(bodyData:any,token:String) : RequestOptions {
    let headers:Headers=new Headers();
    let options = {body:null,headers:headers};

    headers.append('Authorization', 'Bearer '+token);
    
    if(bodyData) options.body = bodyData;

    return new RequestOptions(options);
}