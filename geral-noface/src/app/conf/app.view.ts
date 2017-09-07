import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// SECURITY
import { ViewActivation } from '../security/view.activation';

// FORM COMPONENTS
import { DefaultInputComponent } from '../components/forms/default-input';
import { DefaultFormButtonsComponent } from '../components/forms/default-form-buttons';
import { DefaultDataTableComponent } from '../components/forms/default-datatable';
import { DefaultAutocomplete } from '../components/forms/default-autocomplete';

// MAIN COMPONENTS
import { AppComponent } from '../components/app';
import { HeaderComponent } from '../components/header';
import { NavigationHeaderComponent } from '../components/header/navigation';
import { MenuComponent } from '../components/menu';
import { MainComponent } from '../components/main';
import { MessagesComponent } from '../components/messages';
import { PrincipalComponent } from '../components/principal';
import { SSOCallbackComponent } from '../components/sso_callback';

// CRUDS
import { PaisComponent } from '../components/pais';
import { PaisEditComponent } from '../components/pais/edit';
import { UnidadeFederativaComponent } from '../components/unidade_federativa';
import { UnidadeFederativaEditComponent } from '../components/unidade_federativa/edit';
import { MunicipioComponent } from '../components/municipio';
import { MunicipioEditComponent } from '../components/municipio/edit';


const APP_ROUTES: Routes = [
  { path: '', component: PrincipalComponent, canActivate:[ViewActivation] },
  { path: 'pais', component: PaisComponent, canActivate:[ViewActivation] },
  { path: 'pais/edit/:id', component: PaisEditComponent, canActivate:[ViewActivation] },
  { path: 'pais/new', component: PaisEditComponent, canActivate:[ViewActivation] },
  { path: 'unidade_federativa', component: UnidadeFederativaComponent, canActivate:[ViewActivation] },
  { path: 'unidade_federativa/edit/:id', component: UnidadeFederativaEditComponent, canActivate:[ViewActivation] },
  { path: 'unidade_federativa/new', component: UnidadeFederativaEditComponent, canActivate:[ViewActivation] },
  { path: 'municipio', component: MunicipioComponent, canActivate:[ViewActivation] },
  { path: 'municipio/edit/:id', component: MunicipioEditComponent, canActivate:[ViewActivation] },
  { path: 'municipio/new', component: MunicipioEditComponent, canActivate:[ViewActivation] },
  { path: 'sso_callback', component: SSOCallbackComponent }
];

const FORM_COMPONENTS = [ DefaultInputComponent, DefaultFormButtonsComponent, DefaultDataTableComponent, DefaultAutocomplete ];
const MAIN_COMPONENTS = [ AppComponent, HeaderComponent, NavigationHeaderComponent, MenuComponent, MainComponent, PrincipalComponent, MessagesComponent, SSOCallbackComponent ];
const CRUD_COMPONENTS = [ PaisComponent, PaisEditComponent, UnidadeFederativaComponent, UnidadeFederativaEditComponent, MunicipioComponent, MunicipioEditComponent ]; 

const APP_IMPORTS = [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule, RouterModule.forRoot(APP_ROUTES) ];
const APP_COMPONENTS = [ FORM_COMPONENTS, MAIN_COMPONENTS, CRUD_COMPONENTS ];

export { APP_ROUTES, APP_COMPONENTS, APP_IMPORTS };
