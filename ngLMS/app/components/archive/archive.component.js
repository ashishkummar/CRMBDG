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
var router_1 = require("@angular/router");
var LeadConfig_1 = require("../leadmanager/LeadConfig");
var ArchiveComponent = /** @class */ (function () {
    function ArchiveComponent(Lead, sideBarService, user, alert, authenticationService, route) {
        var _this = this;
        this.Lead = Lead;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.route = route;
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
        this.status = [];
        this.dropDownHelper = new LeadConfig_1.DropDownHelper();
        this.status = this.dropDownHelper.getLeadStatus();
        this.route.params.subscribe(function (params) { return _this.uid = params['userid']; });
        this.searchFromDt.setDate(this.searchFromDt.getDate() - 2);
        this.isAdmin = authenticationService.getUserRole();
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
                headerName: "Lead ID", field: "leadID", width: 185
            },
            { headerName: "Name", field: "leadName" },
            { headerName: "Contact", field: "leadContact" },
            { headerName: "Email", field: "leadEmail", width: 450 },
            { headerName: "Lead Source", field: "leadSource" },
            { headerName: "Lead Type", field: "leadType" },
            {
                headerName: "Requirement/Query", field: "leadQuery", tooltip: function (params) {
                    return params.value;
                }, width: 350, cellRenderer: "communicationCell"
            },
            {
                headerName: "Last Activity", field: "leadLastComm",
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
                headerName: "Last Status", field: "status.value", tooltip: function (params) {
                    if (params.data.status.id == 3 || params.data.status.id == 6)
                        return params.data.reminderDate;
                }
            },
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
        this.LoadArchiveLead();
    }
    ArchiveComponent.prototype.LoadArchiveLead = function () {
        var _this = this;
        var datDif = Math.ceil((this.searchToDt.valueOf() - this.searchFromDt.valueOf()) / (1000 * 3600 * 24));
        if (datDif < 0) {
            this.alert.error("Invalid date range selected");
            return false;
        }
        if (datDif > 120) {
            this.alert.error("120 Days record is allowed at a time");
            return false;
        }
        this.isLoading = true;
        this.Lead.getArchiveLeadByDate(this.searchFromDt, this.searchToDt).subscribe(function (data) {
            _this.rowData = JSON.parse(data).Lead;
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    ArchiveComponent.prototype.ngOnInit = function () {
        this.sideBarService.setPageTitle('Archive Leads');
    };
    ArchiveComponent.prototype.openModal = function (params) {
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
        this.Lead.GetArchiveLeadMsgByLeadID(params.data.leadID).subscribe(function (data) {
            _this.leadMsg = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
        this.display = 'block';
    };
    ArchiveComponent.prototype.onCloseHandled = function () {
        this.display = 'none';
    };
    ArchiveComponent.prototype.updateLead = function () {
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
            _this.sideBarService.updateReminderCount(_this.uid);
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    ArchiveComponent.prototype.updateAllMessages = function () {
    };
    ArchiveComponent.prototype.onFilterTextBoxChanged = function (val) {
        this.gridApi.setQuickFilter(val);
    };
    ArchiveComponent.prototype.changeRemData = function (evn) {
        if (evn.checked) {
            // this.LoadAllReminderForUser(this.uid);
        }
        else {
            //this.LoadReminderForUser(this.uid);
        }
    };
    ArchiveComponent.prototype.downloadPdf = function () {
        var _this = this;
        this.isLoading = true;
        this.Lead.downloadPdf(this.selectedLead).subscribe(function (data) {
            var fileName = "CustomerCommunication" + ".pdf";
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(data, fileName);
            }
            else {
                var link = document.createElement('a');
                link.setAttribute("type", "hidden");
                link.download = fileName;
                link.href = window.URL.createObjectURL(data);
                document.body.appendChild(link);
                link.click();
            }
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    ArchiveComponent = __decorate([
        core_1.Component({
            selector: 'archive-details',
            templateUrl: './archive.component.html',
            styleUrls: ['./archive.component.css']
        }),
        __metadata("design:paramtypes", [index_2.LeadService,
            index_2.SideBarService,
            index_2.UserService,
            index_2.AlertService,
            index_3.AuthenticationService,
            router_1.ActivatedRoute])
    ], ArchiveComponent);
    return ArchiveComponent;
}());
exports.ArchiveComponent = ArchiveComponent;
