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
var index_1 = require("../authGaurd/index");
var UserService = /** @class */ (function () {
    function UserService(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
    }
    UserService.prototype.getToken = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new http_1.RequestOptions({ headers: headers });
    };
    UserService.prototype.getAllUsers = function () {
        return this.http.get('/api/User/GetAllUser', this.getToken())
            .map(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.status === 200) {
                return user.text();
            }
            else {
                throw new Error(user.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    UserService.prototype.getUserByID = function (id) {
        return this.http.get('/api/User/GetUserbyID?userID=' + id, this.getToken())
            .map(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.status === 200) {
                return user.text();
            }
            else {
                throw new Error(user.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    UserService.prototype.getLoginUserDtl = function (id) {
        return this.http.get('/api/User/GetUserDtlbyID?userID=' + id, this.getToken())
            .map(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.status === 200) {
                sessionStorage.setItem('currentUser', JSON.stringify(user.text()));
            }
            else {
                throw new Error(user.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    UserService.prototype.insUptUser = function (obj) {
        return this.http.post('/api/User/insertUpdateUser', obj, this.getToken())
            .map(function (user) {
            if (user && user.status === 200) {
                return user.text();
            }
            else {
                throw new Error('Error while login');
            }
        })
            .catch(this.errorHandler);
    };
    UserService.prototype.deleteUser = function (obj) {
        return this.http.post('/api/User/DeleteUser', obj, this.getToken())
            .map(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                return user.text();
            }
            else {
                throw new Error('Error while login');
            }
        })
            .catch(this.errorHandler);
    };
    UserService.prototype.errorHandler = function (error) {
        return Observable_1.Observable.throw(error.json().Message || "");
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            index_1.AuthenticationService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
