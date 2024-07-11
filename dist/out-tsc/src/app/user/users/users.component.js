import { __decorate } from "tslib";
import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
let UsersComponent = class UsersComponent {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.users$ = this.httpClient
            .get('assets/sample-users.json');
    }
    ngOnDestroy() {
    }
};
UsersComponent = __decorate([
    Component({ selector: 'app-users',
        template: `<ul>
    <li *ngFor="let user of users$ | async">
        User #{{ user.id }}: {{ user.lname }}, {{ user.fname }} - Email: {{ user.email }}
    </li>
</ul>`,
        styleUrls: ['./users.component.scss'],
        standalone: true,
        imports: [
            CommonModule
        ]
    })
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map