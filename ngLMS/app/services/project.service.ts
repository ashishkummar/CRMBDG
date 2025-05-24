import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from '../authGaurd/index';
import { IProject } from '../components/project/IProject';


@Injectable()
export class ProjectService {
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

    getformUploadToken(form) {

        const headers = new Headers();
       // headers.append('Content-Type', undefined );
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new RequestOptions({ headers: headers });
    }

    uploadProject(form: FormData) {

        return this.http.post('/api/Project/UploadProjectFile', form, this.getformUploadToken(form))
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

    insertProject(project: IProject) {

        return this.http.post('/api/Project/InsertProject', project, this.getToken())
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

    deleteProject(project: IProject) {

        return this.http.post('/api/Project/DeleteProject', project, this.getToken())
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

    getAllProject() {
        return this.http.get('/api/Project/GetAllProject', this.getToken())
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