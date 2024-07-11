import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { UsersComponent } from "./user/users/users.component";
let AppComponent = class AppComponent {
    constructor() {
        this.title = "Taskmaster";
    }
};
AppComponent = __decorate([
    Component({
        selector: "app-root",
        standalone: true,
        imports: [HomeComponent,
            RouterModule,
            HeaderComponent,
            FooterComponent,
            HttpClientModule,
            UsersComponent,
            CommonModule,
        ],
        templateUrl: "./app.component.html",
        styleUrls: ["./app.component.scss"],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map