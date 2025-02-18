import { bootstrapApplication } from "@angular/platform-browser";
import { provideProtractorTestingSupport } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import routeConfig from "./app/routes";

import { AppComponent } from "./app/app.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "./environments/environment.prod";
import { enableProdMode } from "@angular/core";
import { AuthInterceptor } from './app/auth.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), 
    provideProtractorTestingSupport(),
    provideNoopAnimations(),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ]
}).catch((err) => console.error(err));
