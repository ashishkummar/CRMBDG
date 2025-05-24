import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IPrivCust } from '../components/privcustomer/IPrivCust'
import { AuthenticationService } from '../authGaurd/index'

@Injectable()
export class PrivCustomer {
    constructor(private http: Http,
        private auth: AuthenticationService
    ) { }

    getToken() {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new RequestOptions({ headers: headers });
    }

    getAllRecord() {
        return this.http.get('/api/PriCust/GetAllRecord', this.getToken())
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

    insUpdtRecord(cust: IPrivCust) {
        return this.http.post('/api/PriCust/InsUpdtRecord', cust, this.getToken())
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

    deleteRecord(cust: IPrivCust) {
        return this.http.post('/api/PriCust/DeleteRecord', cust, this.getToken())
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
            return Observable.throw("Session Expired! Please click <a href='/'>here</a> to login again.");
        }
        return Observable.throw(error.json().Message || "");
    }

}