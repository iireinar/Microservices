import { APP_INITIALIZER } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

// CONF
import { AppConf } from './app.conf';
import { AppUrls } from './app.urls';
import { loadConf } from './load.conf';

// SERVICES
import { MessagesService } from '../services/messages.service';
import { UserService } from '../services/user.service';
import { ApplicationService } from '../services/application.service';

// HTTP
import { httpInterceptor } from './http.interceptor';
import { HttpHeaders } from '../http/headers';

const HTTP_HEADERS = { provide: RequestOptions, useClass: HttpHeaders };
const APP_INITIALIZER_PROVIDER = { provide: APP_INITIALIZER, useFactory: loadConf, deps: [AppConf], multi: true };

const SERVICES = [ MessagesService, UserService, ApplicationService ];
const CONF = [ AppUrls, AppConf ];

const APP_PROVIDERS = [ HTTP_HEADERS, APP_INITIALIZER_PROVIDER, SERVICES, CONF ];
const HTTP_INTERCEPTOR_PROVIDER =  { provide:Http, useFactory: httpInterceptor, deps: [ XHRBackend, RequestOptions, MessagesService ] };

export { APP_PROVIDERS, HTTP_INTERCEPTOR_PROVIDER };
