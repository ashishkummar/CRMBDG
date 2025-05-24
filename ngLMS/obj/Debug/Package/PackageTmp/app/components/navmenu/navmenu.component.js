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
var navbar_service_1 = require("../../services/navbar.service");
var index_1 = require("../../authGaurd/index");
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(sideBarService, auth) {
        this.sideBarService = sideBarService;
        this.auth = auth;
        this.colapsePanel = true;
        this.isAdm = false;
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAdm = this.auth.getUserRole();
        this.sideBarService.change.subscribe(function (isOpen) { _this.colapsePanel = isOpen; });
    };
    NavMenuComponent = __decorate([
        core_1.Component({
            selector: 'nav-menu',
            templateUrl: './navmenu.component.html',
            styleUrls: ['./navmenu.component.css']
        }),
        __metadata("design:paramtypes", [navbar_service_1.SideBarService,
            index_1.AuthenticationService])
    ], NavMenuComponent);
    return NavMenuComponent;
}());
exports.NavMenuComponent = NavMenuComponent;
