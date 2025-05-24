import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http,
        private router: Router
    ) { }

    login(username: string, password: string) {
        
        let token = btoa('{ UserID: \'' + username + '\', Password:\'' + password + '\'}')
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({ headers: headers });
        
        const body = 'userName=' + username + '&password=' + password + '&grant_type=password';
        return this.http.post('/token', body, options)
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('token', user.json().access_token);
                }
                else {
                    throw new Error('Error while login');
                }

                return user;
            })
            .catch(this.errorHandler);
    }

    getToken() {
        return sessionStorage.getItem('token') || '';
    }

    getUserRole(): boolean {
        let user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

        if (user) {
            let getrole = JSON.parse(user);
            if (getrole.role === 1) {
                return true;
            }
            return false;
        }
        return false;
    }

    getUserID(): number {
        let user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

        if (user) {
            let getrole = JSON.parse(user);
            if (getrole) {
                return getrole.id;
            }
            return 0;
        }
        return 0;
    }

    getUserName(): string {
        let user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

        if (user) {
            let getrole = JSON.parse(user);
            if (getrole.name) {
                return getrole.name;
            }
            return '';
        }
        return '';
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    navigateToUrl(page:string) {
        this.router.navigate([page]);
    }

    navigateToUrlWithParam(page: string,param) {
        this.router.navigate([page, param]);
    }

    errorHandler(error: Response) {
        if (error.status == 401) {
            return Observable.throw('Invalid user id or password.');
        }
        return Observable.throw(error.json().error || "");
    }
}