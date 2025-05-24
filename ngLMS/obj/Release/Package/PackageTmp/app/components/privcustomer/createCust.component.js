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
var forms_1 = require("@angular/forms");
var index_1 = require("../../services/index");
var index_2 = require("../../authGaurd/index");
var CreateCustomerComponent = /** @class */ (function () {
    function CreateCustomerComponent(Lead, sideBarService, user, alert, authenticationService, fb) {
        this.Lead = Lead;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.onSaveClick = new core_1.EventEmitter();
        this.popMsg = [];
        this.isLoading = false;
        this.display = 'none';
        this.selectedLead = {
            ID: 0,
            CustomerName: '',
            Address: '',
            anniversaryDt: new Date(),
            BookingDt: new Date(),
            DOB: new Date(),
            MobileNo: '',
            Number: '',
            Product: '',
            UnitID: ''
        };
        this.createLead = this.fb.group({
            ID: 0,
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(25)]],
            email: '',
            address: '',
            anniversary: '',
            Booking: '',
            DOB: '',
            contact: '',
            product: '',
            unitid: ''
        });
    }
    CreateCustomerComponent.prototype.ngOnInit = function () {
        this.createLead.setValue({
            ID: this.customerData.ID,
            name: this.customerData.CustomerName,
            email: this.customerData.Number,
            address: this.customerData.Address,
            anniversary: this.customerData.anniversaryDt,
            Booking: this.customerData.BookingDt,
            DOB: this.customerData.DOB,
            contact: this.customerData.MobileNo,
            product: this.customerData.Product,
            unitid: this.customerData.UnitID
        });
    };
    CreateCustomerComponent.prototype.onCloseHandled = function () {
        this.display = 'none';
    };
    CreateCustomerComponent.prototype.insertLead = function () {
        if (this.createLead.valid) {
            this.customerData.ID = this.createLead.controls['ID'].value;
            this.customerData.CustomerName = this.createLead.controls['name'].value;
            this.customerData.Number = this.createLead.controls['email'].value;
            this.customerData.Address = this.createLead.controls['address'].value;
            this.customerData.anniversaryDt = this.createLead.controls['anniversary'].value;
            this.customerData.BookingDt = this.createLead.controls['Booking'].value;
            this.customerData.DOB = this.createLead.controls['DOB'].value;
            this.customerData.MobileNo = this.createLead.controls['contact'].value;
            this.customerData.Product = this.createLead.controls['product'].value;
            this.customerData.UnitID = this.createLead.controls['unitid'].value;
            this.onSaveClick.emit([this.customerData]);
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateCustomerComponent.prototype, "onSaveClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CreateCustomerComponent.prototype, "customerData", void 0);
    CreateCustomerComponent = __decorate([
        core_1.Component({
            selector: 'create-customer',
            templateUrl: './createCust.component.html',
            styleUrls: ['./createCust.component.css']
        }),
        __metadata("design:paramtypes", [index_1.PrivCustomer,
            index_1.SideBarService,
            index_1.UserService,
            index_1.AlertService,
            index_2.AuthenticationService,
            forms_1.FormBuilder])
    ], CreateCustomerComponent);
    return CreateCustomerComponent;
}());
exports.CreateCustomerComponent = CreateCustomerComponent;
