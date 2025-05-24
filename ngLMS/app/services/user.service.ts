import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IUser } from '../components/createuser/IUser'
import { AuthenticationService  } from '../authGaurd/index'

@Injectable()
export class UserService {


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

    getAllUsers() {
        return this.http.get('/api/User/GetAllUser', this.getToken())
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

    getUserByID(id: string) {
        
        return this.http.get('/api/User/GetUserbyID?userID=' + id, this.getToken())
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

    getLoginUserDtl(id: string) {
       
        return this.http.get('/api/User/GetUserDtlbyID?userID=' + id, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user.text()));
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);

    }

    insUptUser(obj: IUser) {

        return this.http.post('/api/User/insertUpdateUser', obj, this.getToken())
            .map(user => {
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error('An error encounter');
                }
            })
            .catch(this.errorHandler);
    }

    deleteUser(obj: IUser) {
        return this.http.post('/api/User/DeleteUser', obj, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    return user.text();
                }
                else {
                    throw new Error('Error while deleting');
                }
            })
            .catch(this.errorHandler);
    }

    updatePass(obj) {
        return this.http.post('/api/User/resetpass', obj, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    return user.text();
                }
                else {
                    throw new Error('Error while updating Password');
                }
            })
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        return Observable.throw(error.json().Message || "");
    }
}