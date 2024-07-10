import { Component } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    //users$: Observable<User[]>;

    constructor(private httpClient: HttpClient) {
        this.httpClient
            .get<User[]>('assets/sample-users.json')
            .subscribe((res) => {
                console.log('--- result :: ', res);
            });
    }
}
