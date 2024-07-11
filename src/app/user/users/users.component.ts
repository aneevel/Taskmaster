import { Component, OnDestroy, } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-users',
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
export class UsersComponent implements OnDestroy {
    users$: Observable<User[]>;

    constructor(private httpClient: HttpClient) {
        this.users$ = this.httpClient
            .get<User[]>('assets/sample-users.json');
    }

    ngOnDestroy() {
    }
}
