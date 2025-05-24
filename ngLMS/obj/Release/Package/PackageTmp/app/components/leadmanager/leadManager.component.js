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
var api_1 = require("primeng/api");
var index_1 = require("../index");
var index_2 = require("../../services/index");
var index_3 = require("../../authGaurd/index");
var LeadConfig_1 = require("./LeadConfig");
var LeadManagerComponent = /** @class */ (function () {
    function LeadManagerComponent(Lead, sideBarService, user, alert, authenticationService, confirmationService) {
        var _this = this;
        this.Lead = Lead;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.confirmationService = confirmationService;
        this.isLoading = false;
        this.display = 'none';
        this.displayCreateLead = 'none';
        this.displayChat = 'none';
        this.quickFilterTxt = '';
        this.AssignToUser = 1;
        this.ActiveUsers = null;
        this.leadMsg = [];
        this.isAdmin = false;
        this.userMessage = '';
        this.currentUserID = 0;
        this.searchToDt = new Date();
        this.searchFromDt = new Date();
        this.rowSelection = 'single';
        this.displayUserRpt = false;
        this.userAssingChartData = {};
        this.ChartData = {
            labels: ['New', 'Answered', 'Scheduled', "Deactivated", "Closed", "Visited", "Broker", "Rent", "Hot"],
            datasets: [
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: [
                        "#27911b",
                        "#f2ff00",
                        "#fc7305",
                        "#919191",
                        "#d8d8d8",
                        "#3640f7",
                        "#ae3eef",
                        "#ef47e7",
                        "#ed4242"
                    ],
                    hoverBackgroundColor: [
                        "#2ba01e",
                        "#f2ff0a",
                        "#ff7200",
                        "#919191",
                        "#d8d8d8",
                        "#3e47ef",
                        "#ae3eef",
                        "#ea4de3",
                        "#ed4242"
                    ]
                }
            ]
        };
        this.totalRecord = 0;
        this.newRecord = 0;
        this.AnsRecord = 0;
        this.SchRecord = 0;
        this.VisRecord = 0;
        this.broRecord = 0;
        this.HotRecord = 0;
        this.CloRecord = 0;
        this.DeactRecord = 0;
        this.selectedUser = 'All';
        this.selectedSource = '';
        this.selectedStatus = '';
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
        this.updateObj = {
            LeadID: 0,
            AssignID: 0,
            Message: '',
            PostedBy: 0,
            ReminderOn: new Date(),
            Status: 0
        };
        this.status = [];
        this.LeadSource = [];
        this.dropDownHelper = new LeadConfig_1.DropDownHelper();
        this.status = this.dropDownHelper.getLeadStatus();
        this.LeadSource = this.dropDownHelper.getLeadSource();
        this.searchFromDt.setDate(this.searchFromDt.getDate() - 2);
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
            { headerName: "Email", field: "leadEmail", width: 450 },
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
                }, width: 350
            },
            {
                headerName: "Status", field: "status.value", tooltip: function (params) {
                    if (params.data.status.id == 3 || params.data.status.id == 6)
                        return params.data.reminderDate;
                }
            },
            { headerName: "Assignee", field: "leadAssignee" },
            { headerName: "Assigned on", field: "lastUpdatedOn", cellRenderer: "entryDateCell" },
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
        this.LoadLeadForUser();
        this.sideBarService.updateReminderCount(this.authenticationService.getUserID());
    }
    LeadManagerComponent.prototype.ngOnInit = function () {
        this.sideBarService.setPageTitle('Lead Bank');
    };
    LeadManagerComponent.prototype.openModal = function (params) {
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
    LeadManagerComponent.prototype.onCloseHandled = function () {
        this.display = 'none';
        this.displayCreateLead = 'none';
        this.displayChat = 'none';
        this.gridApi.deselectAll();
    };
    LeadManagerComponent.prototype.displayChart = function () {
        this.displayUserRpt = false;
        this.isLoading = true;
        var lable = ['New', 'Answered', 'Scheduled', "Deactivated", "Closed", "Visited", "Broker", "Rent", "Hot"];
        var list = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var count = this.gridApi.getDisplayedRowCount();
        for (var i = 0; i < count; i++) {
            var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
            switch (rowNode.data.status.value) {
                case 'New':
                    list[0] = list[0] + 1;
                    lable[0] = 'New(' + list[0] + ')';
                    break;
                case 'Answered':
                    list[1] = list[1] + 1;
                    lable[1] = 'Answered(' + list[1] + ')';
                    break;
                case 'Scheduled':
                    list[2] = list[2] + 1;
                    lable[2] = 'Scheduled(' + list[2] + ')';
                    break;
                case 'Deactivated':
                    list[3] = list[3] + 1;
                    lable[3] = 'Deactivated(' + list[3] + ')';
                    break;
                case 'Closed':
                    list[4] = list[4] + 1;
                    lable[4] = 'Closed(' + list[4] + ')';
                    break;
                case 'Visited':
                    list[5] = list[5] + 1;
                    lable[5] = 'Visited(' + list[5] + ')';
                    break;
                case 'Broker':
                    list[6] = list[6] + 1;
                    lable[6] = 'Broker(' + list[6] + ')';
                    break;
                case 'Rent':
                    list[7] = list[7] + 1;
                    lable[7] = 'Rent(' + list[7] + ')';
                    break;
                case 'Hot':
                    list[8] = list[8] + 1;
                    lable[8] = 'Hot(' + list[8] + ')';
                    break;
            }
        }
        this.ChartData = this.generateDataset(list, null);
        this.isLoading = false;
        this.displayChat = 'block';
    };
    LeadManagerComponent.prototype.assignRtp = function () {
        this.displayUserRpt = true;
        this.isLoading = true;
        var user = [];
        var leadcount = [];
        var count = this.gridApi.getDisplayedRowCount();
        for (var i = 0; i < count; i++) {
            var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
            var assignTo = rowNode.data.leadAssignee;
            if (assignTo == '') {
                assignTo = 'Unassigned Leads';
            }
            var userindx = user.indexOf(assignTo);
            if (userindx >= 0) {
                leadcount[userindx] = leadcount[userindx] + 1;
            }
            else {
                user.push(assignTo);
                leadcount.push(1);
            }
        }
        this.userAssingChartData = {
            labels: user,
            datasets: [
                {
                    label: 'Leads',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: leadcount
                }
            ]
        };
        this.isLoading = false;
        this.displayChat = 'block';
    };
    LeadManagerComponent.prototype.LoadLeadForUser = function () {
        var _this = this;
        var datDif = Math.ceil((this.searchToDt.valueOf() - this.searchFromDt.valueOf()) / (1000 * 3600 * 24));
        if (datDif < 0) {
            this.alert.error("Invalid date range selected");
            return false;
        }
        if (datDif > 90) {
            this.alert.error("90 Days record is allowed at a time");
            return false;
        }
        this.isLoading = true;
        this.clearAllFilter();
        this.Lead.getLeadByDate(this.searchFromDt, this.searchToDt).subscribe(function (data) {
            _this.rowData = JSON.parse(data).Lead;
            _this.ChartData = _this.generateDataset([0, 0, 0, 0, 0, 0, 0, 0, 0], null);
            if (_this.ActiveUsers == null && _this.isAdmin == true) {
                _this.LoadUsers();
            }
            else {
                _this.isLoading = false;
            }
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    LeadManagerComponent.prototype.onFilterTextBoxChanged = function (val) {
        this.gridApi.setQuickFilter(val);
    };
    LeadManagerComponent.prototype.LoadUsers = function () {
        var _this = this;
        this.user.getAllUsers().subscribe(function (data) {
            _this.ActiveUsers = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error);
        });
    };
    LeadManagerComponent.prototype.updateLead = function () {
        var _this = this;
        this.updateObj.LeadID = this.selectedLead.leadID;
        this.updateObj.AssignID = this.selectedLead.uid;
        this.updateObj.Message = this.userMessage;
        this.updateObj.PostedBy = this.currentUserID;
        this.updateObj.ReminderOn = new Date(this.selectedLead.reminderDate);
        this.updateObj.Status = this.selectedLead.status.id;
        this.isLoading = true;
        this.Lead.updatelead(this.updateObj).subscribe(function (data) {
            // var rowNode = this.gridApi.getRowNode(this.selectedLead.leadID);
            // rowNode.setData(JSON.parse(data));
            _this.gridApi.updateRowData({
                update: [JSON.parse(data)]
            });
            _this.userMessage = "";
            _this.isLoading = false;
            _this.onCloseHandled();
            _this.alert.success("Record Updated successfully");
            _this.sideBarService.updateReminderCount(_this.isAdmin ? _this.selectedUser === 'All' ? 1 : _this.selectedUser : _this.authenticationService.getUserID());
            _this.calculateRecordCount();
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    LeadManagerComponent.prototype.updateAllMessages = function () {
        var _this = this;
        this.isLoading = true;
        this.updateObj.LeadID = this.selectedLead.leadID;
        this.Lead.deleteAllMsg(this.updateObj).subscribe(function (data) {
            _this.gridApi.updateRowData({
                update: [JSON.parse(data)]
            });
            _this.leadMsg = [];
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    LeadManagerComponent.prototype.addNewLead = function () {
        this.displayCreateLead = 'block';
    };
    LeadManagerComponent.prototype.SaveLead = function (data) {
        var _this = this;
        this.isLoading = true;
        this.Lead.insertlead(data).subscribe(function (data) {
            _this.gridApi.updateRowData({
                add: [JSON.parse(data)],
                addIndex: 0
            });
            _this.onCloseHandled();
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    LeadManagerComponent.prototype.export = function () {
        var params = {
            columnSeparator: ','
        };
        this.gridApi.exportDataAsCsv(params);
    };
    LeadManagerComponent.prototype.assignTo = function () {
        var _this = this;
        this.bulkUserAssign = this.gridApi.getSelectedRows();
        if (this.bulkUserAssign.length <= 0) {
            this.alert.error("Please select record to update assignee.");
            return false;
        }
        this.isLoading = true;
        for (var i = 0; i < this.bulkUserAssign.length; i++) {
            this.bulkUserAssign[i].uid = this.AssignToUser;
        }
        this.Lead.updateLeadAssinee(this.bulkUserAssign).subscribe(function (data) {
            var rowdata = JSON.parse(data);
            for (var i = 0; i < rowdata.length; i++) {
                _this.gridApi.updateRowData({
                    update: [rowdata[i]]
                });
            }
            _this.alert.success("Lead successfully assigned to selected user");
            _this.gridApi.deselectAll();
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    LeadManagerComponent.prototype.chartClicked = function (event, rpttype) {
        if (rpttype === 1) {
            var countryFilterComponent = this.gridApi.getFilterInstance("status.value");
            countryFilterComponent.setModel({
                type: "startsWith",
                filter: event.element._view.label
            });
            this.gridApi.onFilterChanged();
        }
        else if (rpttype === 2) {
            var countryFilterComponent = this.gridApi.getFilterInstance("leadAssignee");
            countryFilterComponent.setModel({
                type: "startsWith",
                filter: event.element._view.label
            });
            this.gridApi.onFilterChanged();
        }
        this.onCloseHandled();
    };
    LeadManagerComponent.prototype.clearAllFilter = function () {
        if (this.gridApi !== undefined) {
            this.gridApi.setFilterModel(null);
            this.onFilterTextBoxChanged("");
        }
        this.quickFilterTxt = "";
        this.selectedUser = 'All';
        this.selectedSource = '';
        this.selectedStatus = '';
    };
    LeadManagerComponent.prototype.generateDataset = function (dt, lbl) {
        return {
            labels: lbl === null ? ['New', 'Answered', 'Scheduled', "Deactivated", "Closed", "Visited", "Broker", "Rent", "Hot"] : lbl,
            datasets: [
                {
                    data: dt,
                    backgroundColor: [
                        "#27911b",
                        "#f2ff00",
                        "#fc7305",
                        "#919191",
                        "#d8d8d8",
                        "#3640f7",
                        "#ae3eef",
                        "#ef47e7",
                        "#ed4242"
                    ],
                    hoverBackgroundColor: [
                        "#2ba01e",
                        "#f2ff0a",
                        "#ff7200",
                        "#919191",
                        "#d8d8d8",
                        "#3e47ef",
                        "#ae3eef",
                        "#ea4de3",
                        "#ed4242"
                    ]
                }
            ]
        };
    };
    LeadManagerComponent.prototype.deleteConfirm = function () {
        var _this = this;
        if (this.gridApi.getSelectedRows().length <= 0) {
            this.alert.error("Please select record to delete.");
            return false;
        }
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: function () {
                _this.isLoading = true;
                _this.Lead.Deletelead(_this.gridApi.getSelectedRows()).subscribe(function (data) {
                    var rowdata = JSON.parse(data);
                    for (var i = 0; i < rowdata.length; i++) {
                        _this.gridApi.updateRowData({
                            remove: [rowdata[i]]
                        });
                    }
                    _this.alert.success("Lead deleted successfully");
                    _this.gridApi.deselectAll();
                    _this.isLoading = false;
                    _this.calculateRecordCount();
                }, function (error) {
                    _this.isLoading = false;
                    _this.alert.error(error, 0);
                });
            },
            reject: function () {
            }
        });
    };
    LeadManagerComponent.prototype.onSourceChange = function (val, type) {
        var countryFilterComponent = null;
        switch (type) {
            case '1':
                countryFilterComponent = this.gridApi.getFilterInstance("status.value");
                break;
            case '2':
                countryFilterComponent = this.gridApi.getFilterInstance("leadSource");
                break;
            case '3':
                countryFilterComponent = this.gridApi.getFilterInstance("leadAssignee");
                this.sideBarService.updateReminderCount(this.isAdmin ? this.selectedUser === 'All' ? 1 : this.selectedUser : this.authenticationService.getUserID());
                break;
        }
        if (countryFilterComponent != null) {
            if (val == '' || val == 'All') {
                countryFilterComponent.setModel({
                    type: "startsWith",
                    filter: ''
                });
            }
            else {
                countryFilterComponent.setModel({
                    type: "startsWith",
                    filter: val
                });
            }
            this.gridApi.onFilterChanged();
            if (type == '3') {
                this.calculateRecordCount();
            }
        }
    };
    LeadManagerComponent.prototype.calculateRecordCount = function () {
        this.totalRecord = 0;
        this.newRecord = 0;
        this.AnsRecord = 0;
        this.SchRecord = 0;
        this.VisRecord = 0;
        this.broRecord = 0;
        this.HotRecord = 0;
        this.CloRecord = 0;
        this.DeactRecord = 0;
        this.totalRecord = this.gridApi.getDisplayedRowCount();
        for (var i = 0; i < this.totalRecord; i++) {
            var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
            switch (rowNode.data.status.value) {
                case 'New':
                    this.newRecord = this.newRecord + 1;
                    break;
                case 'Answered':
                    this.AnsRecord = this.AnsRecord + 1;
                    break;
                case 'Scheduled':
                    this.SchRecord = this.SchRecord + 1;
                    break;
                case 'Deactivated':
                    this.DeactRecord = this.DeactRecord + 1;
                    break;
                case 'Closed':
                    this.CloRecord = this.CloRecord + 1;
                    break;
                case 'Visited':
                    this.VisRecord = this.VisRecord + 1;
                    break;
                case 'Broker':
                    this.broRecord = this.broRecord + 1;
                    break;
                case 'Hot':
                    this.HotRecord = this.HotRecord + 1;
                    break;
            }
        }
    };
    LeadManagerComponent.prototype.downloadPdf = function () {
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
    LeadManagerComponent.prototype.downloadFile = function (data) {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = window.URL.createObjectURL(blob);
        window.location.href = url;
    };
    LeadManagerComponent = __decorate([
        core_1.Component({
            selector: 'lead-manager',
            templateUrl: './leadManager.component.html',
            styleUrls: ['./leadManager.component.css']
        }),
        __metadata("design:paramtypes", [index_2.LeadService,
            index_2.SideBarService,
            index_2.UserService,
            index_2.AlertService,
            index_3.AuthenticationService,
            api_1.ConfirmationService])
    ], LeadManagerComponent);
    return LeadManagerComponent;
}());
exports.LeadManagerComponent = LeadManagerComponent;
