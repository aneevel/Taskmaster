import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService implements OnDestroy {

    private currentStatus = 0;
    private statusSubject = new BehaviorSubject<number>(0);
    private status$ = this.statusSubject.asObservable();
    private healthCheckInterval: any;

    public API_URL: string = environment.api.serverUrl;

    constructor(private http: HttpClient) {
        this.statusSubject = new BehaviorSubject<number>(this.currentStatus);
        this.status$ = this.statusSubject.asObservable();
        
        // Start health checks when service is created
        this.startHealthCheck();
    }

    private startHealthCheck(interval: number = 30000) {
        // Initial check
        this.getAPIStatus().subscribe();
        
        // Set up recurring checks
        this.healthCheckInterval = setInterval(() => {
            this.getAPIStatus().subscribe();
        }, interval);
    }

    ngOnDestroy() {
        // Clean up interval when service is destroyed
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
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
