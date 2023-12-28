import { bootstrapApplication } from "@angular/platform-browser";
import { provideProtractorTestingSupport } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import routeConfig from "./app/routes";

import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), 
    provideProtractorTestingSupport(),
    provideNoopAnimations()]
}).catch((err) => console.error(err));
