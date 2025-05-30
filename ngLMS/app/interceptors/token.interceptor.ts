﻿import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    
} from '@angular/common/http';

import { AuthenticationService } from '../authGaurd/auth.service'

import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tnk = sessionStorage.getItem('currentUser') 

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request);
    }
}