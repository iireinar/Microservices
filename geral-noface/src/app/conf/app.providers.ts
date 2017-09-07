import { APP_INITIALIZER } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

// CONF
import { AppConf } from './app.conf';
import { AppUrls } from './app.urls';
import { loadConf } from './load.conf';

// SECURITY
import { Session } from '../security/session';
import { ViewActivation } from '../security/view.activation';

// SERVICES
import { PaisService } from '../services/pais.service';
import { UnidadeFederativaService } from '../services/unidade.federativa.service';
import { MessagesService } from '../services/messages.service';
import { MunicipioService } from '../services/municipio.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

// HTTP
import { httpInterceptor } from './http.interceptor';

// VIEW
import { ViewStateHolder } from '../components/view.state.holder'

const APP_INITIALIZER_PROVIDER = { provide: APP_INITIALIZER, useFactory: loadConf, deps: [AppConf], multi: true };

const SECURITY = [ Session, ViewActivation ];
const SERVICES = [ PaisService, UnidadeFederativaService, MessagesService, MunicipioService, CookieService ];
const CONF = [ AppUrls, AppConf ];
const VIEW = [ ViewStateHolder ];

const APP_PROVIDERS = [ APP_INITIALIZER_PROVIDER, SERVICES, CONF, VIEW, SECURITY ];
const HTTP_INTERCEPTOR_PROVIDER =  { provide:Http, useFactory: httpInterceptor, deps: [ XHRBackend, RequestOptions, MessagesService ] };

export { APP_PROVIDERS, HTTP_INTERCEPTOR_PROVIDER };
