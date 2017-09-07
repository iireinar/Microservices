import { Http, ConnectionBackend, RequestOptions, } from "@angular/http";

import { HttpInterceptor } from '../http/http.interceptor';
import { MessagesService } from '../services/messages.service';

export function httpInterceptor(backend: ConnectionBackend, defaultOptions: RequestOptions, messagesService:MessagesService){
  return new HttpInterceptor(backend, defaultOptions,messagesService);
}
