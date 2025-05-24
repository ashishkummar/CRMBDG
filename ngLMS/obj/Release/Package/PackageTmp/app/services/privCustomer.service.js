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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var index_1 = require("../authGaurd/index");
var PrivCustomer = /** @class */ (function () {
    function PrivCustomer(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    PrivCustomer.prototype.getToken = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new http_1.RequestOptions({ headers: headers });
    };
    PrivCustomer.prototype.getAllRecord = function () {
        return this.http.get('/api/PriCust/GetAllRecord', this.getToken())
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
    PrivCustomer.prototype.insUpdtRecord = function (cust) {
        return this.http.post('/api/PriCust/InsUpdtRecord', cust, this.getToken())
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
    PrivCustomer.prototype.deleteRecord = function (cust) {
        return this.http.post('/api/PriCust/DeleteRecord', cust, this.getToken())
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
    PrivCustomer.prototype.errorHandler = function (error) {
        return Observable_1.Observable.throw(error.json().Message || "");
    };
    PrivCustomer = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            index_1.AuthenticationService])
    ], PrivCustomer);
    return PrivCustomer;
}());
exports.PrivCustomer = PrivCustomer;
