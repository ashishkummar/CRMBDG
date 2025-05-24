import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, RequestMethod, Response, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from '../authGaurd/index'


@Injectable()
export class EmailService {
    constructor(private http: Http,
        private router: Router,
        private auth: AuthenticationService
    ) { }

    getToken() {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new RequestOptions({ headers: headers });
    }

    getEmailId() {

        return this.http.get('/api/email/GetEmailId', this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        if (error.status == 401) {
            return Observable.throw("Session Expired! Please login again.");
        }
        return Observable.throw(error.json().Message || "");
    }
}