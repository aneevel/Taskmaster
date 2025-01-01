import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {

    private currentStatus = 0;
    private statusSubject = new BehaviorSubject<number>(0);
    private status$ = this.statusSubject.asObservable();

    public API_URL: string = environment.api.serverUrl;

    constructor(private http: HttpClient) {
        this.statusSubject = new BehaviorSubject<number>(this.currentStatus);
        this.status$ = this.statusSubject.asObservable();
    }

    getAPIStatus(): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/health`)
            .pipe(
                tap(status => {
                    this.currentStatus = status;
                    this.statusSubject.next(status);
                })
            );
    }

    public getStatus$(): Observable<number> {
        return this.status$;
    }
}
