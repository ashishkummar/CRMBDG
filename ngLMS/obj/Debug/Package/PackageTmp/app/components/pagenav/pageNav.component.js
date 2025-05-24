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
var index_1 = require("../../services/index");
var index_2 = require("../../authGaurd/index");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/interval");
var PageNavComponent = /** @class */ (function () {
    function PageNavComponent(sideBarService, auth, Lead) {
        this.sideBarService = sideBarService;
        this.auth = auth;
        this.Lead = Lead;
        this.pagetitle = '';
        this.ReminderCount = 0;
        this.appUser = '';
        this.showReminderMsg = false;
        this.remMsg = [];
        this.getReminderForUser();
    }
    PageNavComponent.prototype.getReminderForUser = function () {
        var _this = this;
        this.Lead.getReminders().subscribe(function (data) {
            _this.reminder = JSON.parse(data);
            _this.ReminderCount = _this.reminder.length;
            _this.startTimer();
        }, function (error) {
        });
    };
    PageNavComponent.prototype.updateReminderCount = function () {
        var _this = this;
        this.Lead.getReminderCount().subscribe(function (data) {
            _this.ReminderCount = data;
        }, function (error) {
        });
    };
    PageNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sideBarService.pageTitle.subscribe(function (isOpen) { _this.pagetitle = isOpen; });
        this.sideBarService.UpdateReminderCount.subscribe(function (isupdate) { if (isupdate) {
            _this.getReminderForUser();
        } });
        this.appUser = this.auth.getUserName();
    };
    PageNavComponent.prototype.toggleclick = function () {
        this.sideBarService.toggle();
    };
    PageNavComponent.prototype.logout = function () {
        this.auth.logout();
    };
    PageNavComponent.prototype.ReminderClicked = function () {
        this.auth.navigateToUrl('/leads/reminders');
    };
    PageNavComponent.prototype.startTimer = function () {
        var _this = this;
        if (this.ReminderCount > 0) {
            Observable_1.Observable.interval(120000)
                .subscribe(function (i) {
                _this.remMsg = [];
                for (var _i = 0, _a = _this.reminder; _i < _a.length; _i++) {
                    var rem = _a[_i];
                    if (new Date(rem.reminderDate) > new Date() && new Date(rem.reminderDate) <= new Date(new Date().getTime() + 5 * 60000)) {
                        _this.remMsg.push(rem);
                    }
                }
                if (_this.remMsg.length > 0) {
                    _this.showReminderMsg = true;
                }
            });
        }
    };
    PageNavComponent.prototype.remiderClosed = function () {
        this.remMsg = [];
        this.showReminderMsg = false;
    };
    PageNavComponent = __decorate([
        core_1.Component({
            selector: 'page-bar',
            templateUrl: './pageNav.component.html',
            styleUrls: ['./pageNav.component.css']
        }),
        __metadata("design:paramtypes", [index_1.SideBarService,
            index_2.AuthenticationService,
            index_1.LeadService])
    ], PageNavComponent);
    return PageNavComponent;
}());
exports.PageNavComponent = PageNavComponent;
