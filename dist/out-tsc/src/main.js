import { bootstrapApplication } from "@angular/platform-browser";
import { provideProtractorTestingSupport } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import routeConfig from "./app/routes";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
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
        provideHttpClient()
    ]
}).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map