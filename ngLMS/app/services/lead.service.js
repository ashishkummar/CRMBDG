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
var LeadService = /** @class */ (function () {
    function LeadService(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
    }
    LeadService.prototype.getToken = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new http_1.RequestOptions({ headers: headers });
    };
    LeadService.prototype.getTokenForPDFResponce = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new http_1.RequestOptions({ headers: headers, responseType: http_1.ResponseContentType.Blob });
    };
    LeadService.prototype.getLeadByDate = function (from, to) {
        return this.http.get('/api/Lead/GetLeadByDate?from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
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
    LeadService.prototype.getDate = function (dt) {
        return dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
    };
    LeadService.prototype.getLeadMsgByLeadID = function (LeadID) {
        return this.http.get('/api/Lead/GetLeadMsgByLeadID?leadID=' + LeadID, this.getToken())
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
    LeadService.prototype.updatelead = function (lead) {
        return this.http.post('/api/Lead/UpdateLead', lead, this.getToken())
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
    LeadService.prototype.deleteAllMsg = function (lead) {
        return this.http.post('/api/Lead/DeleteAllMsg', lead, this.getToken())
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
    LeadService.prototype.insertlead = function (lead) {
        return this.http.post('/api/Lead/CreateLead', lead, this.getToken())
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
    LeadService.prototype.updateLeadAssinee = function (lead) {
        return this.http.post('/api/Lead/UpdateLeadUser', lead, this.getToken())
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
    LeadService.prototype.Deletelead = function (lead) {
        return this.http.post('/api/Lead/Deletelead', lead, this.getToken())
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
    LeadService.prototype.getReminderCount = function (uid) {
        return this.http.get('/api/Lead/GetReminderCount?uid=' + uid, this.getToken())
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.status === 200) {
                return data.text();
            }
            else {
                throw new Error(data.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    LeadService.prototype.getReminders = function (uid) {
        return this.http.get('/api/Lead/GetReminderForLoginUser?uid=' + uid, this.getToken())
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.status === 200) {
                return data.text();
            }
            else {
                throw new Error(data.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    LeadService.prototype.getAllReminders = function (uid) {
        return this.http.get('/api/Lead/GetAllReminderForLoginUser?uid=' + uid, this.getToken())
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.status === 200) {
                return data.text();
            }
            else {
                throw new Error(data.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    LeadService.prototype.getMagicLead = function (api, from, to) {
        return this.http.get('/api/Lead/GetLeadFromMagic?api=' + api + '&from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.status === 200) {
                return data.text();
            }
            else {
                throw new Error(data.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    LeadService.prototype.getHousingLead = function (from, to) {
        return this.http.get('/api/Lead/GetLeadFromHousing?from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.status === 200) {
                return data.text();
            }
            else {
                throw new Error(data.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    LeadService.prototype.getAcreLead = function (userid, pass, from, to) {
        return this.http.get('/api/Lead/GetLeadFromAcres?userid=' + userid + '&password=' + pass + '&from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.status === 200) {
                return data.text();
            }
            else {
                throw new Error(data.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    LeadService.prototype.insertApilead = function (lead) {
        return this.http.post('/api/Lead/CreateAPILead', lead, this.getToken())
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
    LeadService.prototype.getLastFetch = function (source) {
        return this.http.get('/api/Lead/GetLastLeadFetch?source=' + source, this.getToken())
            .map(function (data) {
            // login successful if there's a jwt token in the response
            if (data && data.status === 200) {
                return data.text();
            }
            else {
                throw new Error(data.statusText || '');
            }
        })
            .catch(this.errorHandler);
    };
    LeadService.prototype.getArchiveLeadByDate = function (from, to) {
        return this.http.get('/api/Lead/GetArchiveLeadByDate?from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
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
    LeadService.prototype.GetArchiveLeadMsgByLeadID = function (LeadID) {
        return this.http.get('/api/Lead/GetArchiveLeadMsgByLeadID?leadID=' + LeadID, this.getToken())
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
    LeadService.prototype.downloadPdf = function (lead) {
        return this.http.post('/api/Lead/DownloadAsPdf', lead, this.getTokenForPDFResponce())
            .map(function (r) { return r.blob(); })
            .catch(this.errorHandler);
    };
    LeadService.prototype.errorHandler = function (error) {
        if (error.status == 401) {
            return Observable_1.Observable.throw("Session Expired! Please login again.");
        }
        return Observable_1.Observable.throw(error.json().Message || "");
    };
    LeadService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            index_1.AuthenticationService])
    ], LeadService);
    return LeadService;
}());
exports.LeadService = LeadService;
