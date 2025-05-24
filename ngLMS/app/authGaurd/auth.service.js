"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var token = btoa('{ UserID: \'' + username + '\', Password:\'' + password + '\'}');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        var body = 'userName=' + username + '&password=' + password + '&grant_type=password';
        return this.http.post('/token', body, options)
            .map(function (user) {
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
    };
    AuthenticationService.prototype.getToken = function () {
        return sessionStorage.getItem('token') || '';
    };
    AuthenticationService.prototype.getUserRole = function () {
        var user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        if (user) {
            var getrole = JSON.parse(user);
            if (getrole.role === 1) {
                return true;
            }
            return false;
        }
        return false;
    };
    AuthenticationService.prototype.getUserID = function () {
        var user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        if (user) {
            var getrole = JSON.parse(user);
            if (getrole) {
                return getrole.id;
            }
            return 0;
        }
        return 0;
    };
    AuthenticationService.prototype.getUserName = function () {
        var user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        if (user) {
            var getrole = JSON.parse(user);
            if (getrole.name) {
                return getrole.name;
            }
            return '';
        }
        return '';
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
    };
    AuthenticationService.prototype.navigateToUrl = function (page) {
        this.router.navigate([page]);
    };
    AuthenticationService.prototype.navigateToUrlWithParam = function (page, param) {
        this.router.navigate([page, param]);
    };
    AuthenticationService.prototype.errorHandler = function (error) {
        if (error.status == 401) {
            return Observable_1.Observable.throw('Invalid user id or password.');
        }
        return Observable_1.Observable.throw(error.json().error || "");
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
