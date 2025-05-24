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
var index_1 = require("../index");
var index_2 = require("../../services/index");
var index_3 = require("../../authGaurd/index");
var ReminderDetailsComponent = /** @class */ (function () {
    function ReminderDetailsComponent(Lead, sideBarService, user, alert, authenticationService) {
        var _this = this;
        this.Lead = Lead;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.popMsg = [];
        this.isLoading = false;
        this.display = 'none';
        this.displayCreateLead = 'none';
        this.AssignToUser = 1;
        this.ActiveUsers = null;
        this.leadMsg = [];
        this.isAdmin = false;
        this.userMessage = '';
        this.currentUserID = 0;
        this.searchToDt = new Date();
        this.searchFromDt = new Date();
        this.rowSelection = 'single';
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
        this.todayReminder = true;
        this.updateObj = {
            LeadID: 0,
            AssignID: 0,
            Message: '',
            PostedBy: 0,
            ReminderOn: new Date(),
            Status: 0
        };
        this.status = [
            { id: 1, value: "New" },
            { id: 2, value: "Answered" },
            { id: 3, value: "Scheduled" },
            { id: 4, value: "Deactivated" },
            { id: 5, value: "Closed" },
            { id: 6, value: "Visited" },
            { id: 7, value: "Broker" },
            { id: 8, value: "Rent" },
            { id: 9, value: "Hot" }
        ];
        this.searchFromDt.setDate(this.searchFromDt.getDate() - 90);
        this.isAdmin = authenticationService.getUserRole();
        if (this.isAdmin) {
            this.rowSelection = "multiple";
        }
        this.currentUserID = authenticationService.getUserID();
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = {
            onGridReady: function (params) {
                if (params) {
                    params.api.sizeColumnsToFit();
                    _this.gridApi = params.api;
                }
            },
        };
        this.columnDefs = [
            {
                headerName: "Lead ID", field: "leadID", width: 185,
                checkboxSelection: this.isAdmin,
                headerCheckboxSelection: this.isAdmin,
                headerCheckboxSelectionFilteredOnly: this.isAdmin
            },
            { headerName: "Name", field: "leadName" },
            { headerName: "Contact", field: "leadContact" },
            { headerName: "Email", field: "leadEmail" },
            { headerName: "Lead Source", field: "leadSource" },
            { headerName: "Lead Type", field: "leadType" },
            {
                headerName: "Requirement/Query", field: "leadQuery", tooltip: function (params) {
                    return params.value;
                }, width: 350, cellRenderer: "communicationCell"
            },
            {
                headerName: "Recent Activity", field: "leadLastComm",
                cellStyle: function (params) {
                    if (params.data.lastComBy === 1) {
                        return { color: '#fff', backgroundColor: 'red' };
                    }
                    else {
                        return { color: '', backgroundColor: '' };
                        ;
                    }
                },
                cellRenderer: "recentQuerycellRendrer",
                tooltip: function (params) {
                    return params.value;
                }, width: 250
            },
            {
                headerName: "Status", field: "status.value", tooltip: function (params) {
                    if (params.data.status.id == 3 || params.data.status.id == 6)
                        return params.data.reminderDate;
                }
            },
            { headerName: "Assignee", field: "leadAssignee" },
            { headerName: "Reminder on", field: "reminderDate", cellRenderer: "entryDateCell" },
            { headerName: "Entry Date", field: "leadEntryDate", cellRenderer: "entryDateCell" }
        ];
        this.frameworkComponents = {
            recentQuerycellRendrer: index_1.RecentQueryCellRendrer,
            communicationCell: index_1.communicationCellRendrer,
            entryDateCell: index_1.entryDateCellRendrer
        };
        this.gridOptions.getRowHeight = function (params) {
            return 50;
        };
        this.getRowNodeId = function (data) {
            return data.leadID;
        };
        this.LoadReminderForUser();
    }
    ReminderDetailsComponent.prototype.LoadReminderForUser = function () {
        var _this = this;
        this.isLoading = true;
        this.Lead.getReminders().subscribe(function (data) {
            _this.rowData = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    ReminderDetailsComponent.prototype.LoadAllReminderForUser = function () {
        var _this = this;
        this.isLoading = true;
        this.Lead.getAllReminders().subscribe(function (data) {
            _this.rowData = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    ReminderDetailsComponent.prototype.ngOnInit = function () {
    };
    ReminderDetailsComponent.prototype.openModal = function (params) {
        var _this = this;
        this.isLoading = true;
        this.selectedLead = params.data;
        if (params.data.reminderDate != null) {
            this.selectedLead.reminderDate = new Date(this.selectedLead.reminderDate);
        }
        else {
            this.selectedLead.reminderDate = new Date();
        }
        this.leadMsg = [];
        this.Lead.getLeadMsgByLeadID(params.data.leadID).subscribe(function (data) {
            _this.leadMsg = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
        this.display = 'block';
    };
    ReminderDetailsComponent.prototype.onCloseHandled = function () {
        this.display = 'none';
    };
    ReminderDetailsComponent.prototype.updateLead = function () {
        var _this = this;
        this.updateObj.LeadID = this.selectedLead.leadID;
        this.updateObj.AssignID = this.selectedLead.uid;
        this.updateObj.Message = this.userMessage;
        this.updateObj.PostedBy = this.currentUserID;
        this.updateObj.ReminderOn = new Date(this.selectedLead.reminderDate);
        this.updateObj.Status = this.selectedLead.status.id;
        this.isLoading = false;
        this.Lead.updatelead(this.updateObj).subscribe(function (data) {
            // var rowNode = this.gridApi.getRowNode(this.selectedLead.leadID);
            // rowNode.setData(JSON.parse(data));
            _this.gridApi.updateRowData({
                update: [JSON.parse(data)]
            });
            _this.isLoading = false;
            _this.onCloseHandled();
            _this.alert.success("Record Updated successfully");
            _this.sideBarService.updateReminderCount(true);
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    ReminderDetailsComponent.prototype.updateAllMessages = function () {
    };
    ReminderDetailsComponent.prototype.onFilterTextBoxChanged = function (val) {
        this.gridApi.setQuickFilter(val);
    };
    ReminderDetailsComponent.prototype.changeRemData = function (evn) {
        if (evn.checked) {
            this.LoadReminderForUser();
        }
        else {
            this.LoadAllReminderForUser();
        }
    };
    ReminderDetailsComponent = __decorate([
        core_1.Component({
            selector: 'reminder-details',
            templateUrl: './reminderDetails.component.html',
            styleUrls: ['./reminderDetails.component.css']
        }),
        __metadata("design:paramtypes", [index_2.LeadService,
            index_2.SideBarService,
            index_2.UserService,
            index_2.AlertService,
            index_3.AuthenticationService])
    ], ReminderDetailsComponent);
    return ReminderDetailsComponent;
}());
exports.ReminderDetailsComponent = ReminderDetailsComponent;
