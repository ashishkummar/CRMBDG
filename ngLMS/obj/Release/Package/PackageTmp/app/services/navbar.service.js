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
var SideBarService = /** @class */ (function () {
    function SideBarService() {
        this.isOpen = true;
        this.change = new core_1.EventEmitter();
        this.pageTitle = new core_1.EventEmitter();
        this.UpdateReminderCount = new core_1.EventEmitter();
    }
    SideBarService.prototype.toggle = function () {
        this.isOpen = !this.isOpen;
        this.change.emit(this.isOpen);
    };
    SideBarService.prototype.collapsPanel = function () {
        this.isOpen = true;
        this.change.emit(true);
    };
    SideBarService.prototype.ExpandPanel = function () {
        this.isOpen = false;
        this.change.emit(false);
    };
    SideBarService.prototype.setPageTitle = function (title) {
        this.pageTitle.emit(title);
    };
    SideBarService.prototype.updateReminderCount = function (uid) {
        this.UpdateReminderCount.emit(uid);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SideBarService.prototype, "change", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SideBarService.prototype, "pageTitle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SideBarService.prototype, "UpdateReminderCount", void 0);
    SideBarService = __decorate([
        core_1.Injectable()
    ], SideBarService);
    return SideBarService;
}());
exports.SideBarService = SideBarService;
