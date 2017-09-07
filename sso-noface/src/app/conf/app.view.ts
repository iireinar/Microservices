import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// FORM COMPONENTS
import { DefaultDataTableComponent } from '../components/forms/default-datatable';


// MAIN COMPONENTS
import { AppComponent } from '../components/app';
import { MainComponent } from '../components/main';
import { MessagesComponent } from '../components/messages';
import { PrincipalComponent } from '../components/principal';
import { ClientErrorComponent } from '../components/client-error';

// CRUDS
import { LoginComponent } from '../components/login';
import { RegisterComponent } from '../components/register';
import { ApplicationComponent } from '../components/application';

const APP_ROUTES: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'client-error', component: ClientErrorComponent },
  { path: 'application', component: ApplicationComponent }
];

const FORM_COMPONENTS = [ DefaultDataTableComponent ];
const MAIN_COMPONENTS = [ AppComponent, MainComponent, PrincipalComponent, MessagesComponent, ClientErrorComponent ];
const CRUD_COMPONENTS = [ LoginComponent, RegisterComponent, ApplicationComponent ]; 

const APP_IMPORTS = [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule, RouterModule.forRoot(APP_ROUTES) ];
const APP_COMPONENTS = [ FORM_COMPONENTS, MAIN_COMPONENTS, CRUD_COMPONENTS ];

export { APP_ROUTES, APP_COMPONENTS, APP_IMPORTS };
