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
var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
        this.alerts = [];
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getAlert().subscribe(function (alert) {
            if (!alert) {
                // clear alerts when an empty alert is received
                _this.alerts = [];
                return;
            }
            // add alert to array
            _this.alerts.push(alert);
        });
    };
    AlertComponent.prototype.removeAlert = function (alert) {
        this.alerts = this.alerts.filter(function (x) { return x !== alert; });
    };
    AlertComponent.prototype.cssClass = function (alert) {
        if (!alert) {
            return;
        }
        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success-cus';
            case AlertType.Error:
                return 'alert alert-danger-cus';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    };
    AlertComponent = __decorate([
        core_1.Component({
            selector: 'alert',
            templateUrl: './alert.component.html',
            styleUrls: ['./alert.component.css']
        }),
        __metadata("design:paramtypes", [index_1.AlertService])
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
var Alert = /** @class */ (function () {
    function Alert() {
    }
    return Alert;
}());
exports.Alert = Alert;
var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
