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
var ProjectService = /** @class */ (function () {
    function ProjectService(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
    }
    ProjectService.prototype.getToken = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new http_1.RequestOptions({ headers: headers });
    };
    ProjectService.prototype.getformUploadToken = function (form) {
        var headers = new http_1.Headers();
        // headers.append('Content-Type', undefined );
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new http_1.RequestOptions({ headers: headers });
    };
    ProjectService.prototype.uploadProject = function (form) {
        return this.http.post('/api/Project/UploadProjectFile', form, this.getformUploadToken(form))
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
    ProjectService.prototype.insertProject = function (project) {
        return this.http.post('/api/Project/InsertProject', project, this.getToken())
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
    ProjectService.prototype.deleteProject = function (project) {
        return this.http.post('/api/Project/DeleteProject', project, this.getToken())
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
    ProjectService.prototype.getAllProject = function () {
        return this.http.get('/api/Project/GetAllProject', this.getToken())
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
    ProjectService.prototype.errorHandler = function (error) {
        return Observable_1.Observable.throw(error.json().Message || "");
    };
    ProjectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            index_1.AuthenticationService])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
