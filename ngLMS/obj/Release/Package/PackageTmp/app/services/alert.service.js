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
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
var alert_component_1 = require("../components/alert/alert.component");
var AlertService = /** @class */ (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new Subject_1.Subject();
        this.keepAfterRouteChange = false;
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (_this.keepAfterRouteChange) {
                    // only keep for a single route change
                    _this.keepAfterRouteChange = false;
                }
                else {
                    // clear alert messages
                    _this.clear();
                }
            }
        });
    }
    AlertService.prototype.getAlert = function () {
        return this.subject.asObservable();
    };
    AlertService.prototype.success = function (message, timeout, keepAfterRouteChange) {
        if (timeout === void 0) { timeout = 5000; }
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(alert_component_1.AlertType.Success, message, keepAfterRouteChange, timeout);
    };
    AlertService.prototype.error = function (message, timeout, keepAfterRouteChange) {
        if (timeout === void 0) { timeout = 5000; }
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(alert_component_1.AlertType.Error, message, keepAfterRouteChange, timeout);
    };
    AlertService.prototype.info = function (message, timeout, keepAfterRouteChange) {
        if (timeout === void 0) { timeout = 5000; }
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(alert_component_1.AlertType.Info, message, keepAfterRouteChange, timeout);
    };
    AlertService.prototype.warn = function (message, timeout, keepAfterRouteChange) {
        if (timeout === void 0) { timeout = 5000; }
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(alert_component_1.AlertType.Warning, message, keepAfterRouteChange, timeout);
    };
    AlertService.prototype.alert = function (type, message, keepAfterRouteChange, timeout) {
        var _this = this;
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        if (timeout === void 0) { timeout = 5000; }
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: type, message: message });
        if (timeout != 0) {
            setTimeout(function () {
                _this.clear();
            }, timeout);
        }
    };
    AlertService.prototype.clear = function () {
        // clear alerts
        this.subject.next();
    };
    AlertService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
