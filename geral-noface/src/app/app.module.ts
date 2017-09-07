import { NgModule } from '@angular/core';

import 'rxjs/Rx';

import { AppComponent } from './components/app';
import { APP_ROUTES, APP_COMPONENTS, APP_IMPORTS } from './conf/app.view';
import { APP_PROVIDERS, HTTP_INTERCEPTOR_PROVIDER } from './conf/app.providers';

@NgModule({
  declarations: APP_COMPONENTS,
  imports: [APP_IMPORTS],
  providers: [APP_PROVIDERS, HTTP_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})

export class AppModule {}
