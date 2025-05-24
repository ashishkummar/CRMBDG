import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Alert, AlertType } from '../components/alert/alert.component';

@Injectable()
export class AlertService {
    public subject = new Subject<Alert>();
    public keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, timeout = 5000, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange, timeout);
    }

    error(message: string, timeout = 5000, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange, timeout);
    }

    info(message: string, timeout = 5000, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange, timeout);
    }

    warn(message: string, timeout = 5000, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange, timeout);
    }

    alert(type: AlertType, message: string, keepAfterRouteChange = false, timeout = 5000) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Alert>{ type: type, message: message });

        if (timeout != 0) {
            setTimeout(() => {
                this.clear();
            }, timeout);
        }

    }

    clear() {
        // clear alerts
        this.subject.next();
    }
}