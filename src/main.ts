import { bootstrapApplication } from "@angular/platform-browser";
import { provideProtractorTestingSupport } from "@angular/platform-browser";
import { AuthModule, provideAuth0 } from "@auth0/auth0-angular";
import { provideRouter } from "@angular/router";
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import routeConfig from "./app/routes";

import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment.prod";
import { enableProdMode } from "@angular/core";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), 
    provideProtractorTestingSupport(),
    provideNoopAnimations(),
    provideAuth0({ domain: 'dev-m0s2fmu1eva0pw6s.us.auth0.com',
      clientId: '05F4UUx0gXQAV3cWyrbiZDPp1io8J6Ix'
    })
  ]
}).catch((err) => console.error(err));
