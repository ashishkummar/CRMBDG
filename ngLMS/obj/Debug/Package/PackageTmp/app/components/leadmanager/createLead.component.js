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
var CreateLeadComponent = /** @class */ (function () {
    function CreateLeadComponent(Lead, sideBarService, user, alert, authenticationService, fb) {
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
            leadID: 0,
            lastComBy: '',
            leadAssignee: '',
            lastUpdatedOn: new Date(),
            leadContact: '',
            leadEmail: '',
            leadEntryDate: new Date(),
            leadLastComm: '',
            leadLastCommDt: new Date(),
            leadName: '',
            leadQuery: '',
            leadSource: '',
            leadType: '',
            recentQuery: '',
            status: { id: 0, value: '' },
            uid: 0,
            reminderDate: new Date()
        };
        this.sources = [
            { id: "99Acres", value: "99Acres" },
            { id: "Magicbriks", value: "Magicbricks" },
            { id: "Commonflor", value: "Commonfloor" },
            { id: "Sulekha", value: "Sulekha" },
            { id: "Makkan", value: "Makkan" },
            { id: "Indiaproperty", value: "Indiaproperty" },
            { id: "Justdial", value: "Justdial" },
            { id: "Mailer", value: "Mailer" },
            { id: "Sms", value: "Sms" },
            { id: "Website", value: "Website" },
            { id: "Broker", value: "Broker" },
            { id: "Vartcual no", value: "Vartcual no" },
            { id: "Tollfree", value: "Tollfree" },
            { id: "Propertywala", value: "Propertywala" },
            { id: "Walkin", value: "Walkin" },
            { id: "PPC LEAD", value: "PPC LEAD" },
            { id: "nobroker.in", value: "nobroker.in" },
            { id: "housing.com", value: "housing.com" },
            { id: "quikr", value: "quikr" },
            { id: "Other source", value: "Other source" }
        ];
        this.type = [
            { id: "Individual", value: "Individual" },
            { id: "Dealer", value: "Dealer" }
        ];
        this.createLead = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(25)]],
            email: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")
                ]],
            createdOn: ['', [forms_1.Validators.required]],
            Source: ['', [forms_1.Validators.required]],
            Type: ['', [forms_1.Validators.required]],
            query: ['', [forms_1.Validators.required]],
            contact: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(13)]]
        });
    }
    CreateLeadComponent.prototype.ngOnInit = function () {
    };
    CreateLeadComponent.prototype.onCloseHandled = function () {
        this.display = 'none';
    };
    CreateLeadComponent.prototype.insertLead = function () {
        if (this.createLead.valid) {
            this.selectedLead.leadID = 0;
            this.selectedLead.leadName = this.createLead.controls['name'].value;
            this.selectedLead.leadEmail = this.createLead.controls['email'].value;
            this.selectedLead.leadSource = this.createLead.controls['Source'].value;
            this.selectedLead.leadType = this.createLead.controls['Type'].value;
            this.selectedLead.leadEntryDate = this.createLead.controls['createdOn'].value;
            this.selectedLead.leadQuery = this.createLead.controls['query'].value;
            this.selectedLead.leadContact = this.createLead.controls['contact'].value;
            this.selectedLead.uid = this.authenticationService.getUserID();
            this.onSaveClick.emit([this.selectedLead]);
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateLeadComponent.prototype, "onSaveClick", void 0);
    CreateLeadComponent = __decorate([
        core_1.Component({
            selector: 'create-lead',
            templateUrl: './createLead.component.html',
            styleUrls: ['./createLead.component.css']
        }),
        __metadata("design:paramtypes", [index_1.LeadService,
            index_1.SideBarService,
            index_1.UserService,
            index_1.AlertService,
            index_2.AuthenticationService,
            forms_1.FormBuilder])
    ], CreateLeadComponent);
    return CreateLeadComponent;
}());
exports.CreateLeadComponent = CreateLeadComponent;
