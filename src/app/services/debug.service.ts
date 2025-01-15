@Injectable({
    providedIn: 'root'
})
export class DebugService {
    debugObservable<T>(name: string, observable: Observable<T>): Observable<T> {
        return observable.pipe(
            tap(value => {
                console.group(name);
                console.log('Time:', new Date().toISOString());
                console.log('Value:', value);
                console.groupEnd();
            })
        );
    }
}

// Usage:
constructor(private debug: DebugService) {
    this.debug.debugObservable('User Stream', this.userService.user$).subscribe();
} 