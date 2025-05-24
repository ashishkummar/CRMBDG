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
var PrivilageCustomer = /** @class */ (function () {
    function PrivilageCustomer(Lead, sideBarService, user, alert, authenticationService) {
        var _this = this;
        this.Lead = Lead;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.popMsg = [];
        this.isLoading = false;
        this.display = 'none';
        this.isAdmin = false;
        this.currentUserID = 0;
        this.rowSelection = 'single';
        this.selectedRec = {
            ID: 0,
            CustomerName: '',
            Address: '',
            anniversaryDt: new Date(),
            MobileNo: '',
            Number: '',
            Product: '',
            UnitID: '',
            BookingDt: new Date(),
            DOB: new Date()
        };
        this.isAdmin = authenticationService.getUserRole();
        if (this.isAdmin) {
            //     this.rowSelection = "multiple";
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
                headerName: "ID", field: "ID", width: 100,
                checkboxSelection: this.isAdmin,
                headerCheckboxSelection: this.isAdmin,
                headerCheckboxSelectionFilteredOnly: this.isAdmin
            },
            { headerName: "Name", field: "CustomerName" },
            { headerName: "Mobile No", field: "MobileNo" },
            { headerName: "Email", field: "Number" },
            {
                headerName: "Brith Day", field: "DOB", filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        if (dateAsString == null)
                            return -1;
                        var dateParts = dateAsString.split("/");
                        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                        if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                            return 0;
                        }
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        }
                        if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        }
                    },
                    browserDatePicker: true
                }
            },
            {
                headerName: "Anniversary Day", field: "anniversaryDt", filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        if (dateAsString == null)
                            return -1;
                        var dateParts = dateAsString.split("/");
                        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                        if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                            return 0;
                        }
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        }
                        if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        }
                    },
                    browserDatePicker: true
                }
            },
            {
                headerName: "Address", field: "Address", tooltip: function (params) {
                    return params.value;
                }, width: 350, cellRenderer: "recentQuerycellRendrer"
            },
            {
                headerName: "Booking Date", field: "BookingDt", filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        if (dateAsString == null)
                            return -1;
                        var dateParts = dateAsString.split("/");
                        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                        if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                            return 0;
                        }
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        }
                        if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        }
                    },
                    browserDatePicker: true
                }
            },
            {
                headerName: "Product", field: "Product", tooltip: function (params) {
                    return params.value;
                }
            },
            { headerName: "Unit ID", field: "UnitID" }
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
            return data.ID;
        };
        this.LoadPrevCustomer();
    }
    PrivilageCustomer.prototype.LoadPrevCustomer = function () {
        var _this = this;
        this.isLoading = true;
        this.Lead.getAllRecord().subscribe(function (data) {
            _this.rowData = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    PrivilageCustomer.prototype.createCustomer = function () {
        this.resetSelectedRecord();
        this.display = 'block';
    };
    //LoadAllReminderForUser() {
    //    this.isLoading = true;
    //    this.Lead.getAllReminders().subscribe(
    //        data => {
    //            this.rowData = JSON.parse(data);
    //            this.isLoading = false;
    //        },
    //        error => {
    //            this.isLoading = false;
    //            this.alert.error(error, 0);
    //        });
    //}
    PrivilageCustomer.prototype.ngOnInit = function () {
        this.sideBarService.setPageTitle('Privilege Customer');
    };
    PrivilageCustomer.prototype.openModal = function (params) {
        this.display = 'block';
        this.selectedRec = params.data;
    };
    PrivilageCustomer.prototype.onCloseHandled = function () {
        this.display = 'none';
    };
    PrivilageCustomer.prototype.resetSelectedRecord = function () {
        this.selectedRec = {
            ID: 0,
            CustomerName: '',
            Address: '',
            anniversaryDt: new Date(),
            MobileNo: '',
            Number: '',
            Product: '',
            UnitID: '',
            BookingDt: new Date(),
            DOB: new Date()
        };
    };
    //updateLead() {
    //    this.updateObj.LeadID = this.selectedLead.leadID;
    //    this.updateObj.AssignID = this.selectedLead.uid;
    //    this.updateObj.Message = this.userMessage;
    //    this.updateObj.PostedBy = this.currentUserID;
    //    this.updateObj.ReminderOn = new Date(this.selectedLead.reminderDate);
    //    this.updateObj.Status = this.selectedLead.status.id;
    //    this.isLoading = false;
    //    this.Lead.updatelead(this.updateObj).subscribe(
    //        data => {
    //            // var rowNode = this.gridApi.getRowNode(this.selectedLead.leadID);
    //            // rowNode.setData(JSON.parse(data));
    //            this.gridApi.updateRowData({
    //                update: [JSON.parse(data)]
    //            });
    //            this.isLoading = false;
    //            this.onCloseHandled();
    //            this.alert.success("Record Updated successfully");
    //            this.sideBarService.updateReminderCount(true);
    //        },
    //        error => {
    //            this.isLoading = false;
    //            this.alert.error(error, 0);
    //        });
    //}
    //updateAllMessages() {
    //}
    PrivilageCustomer.prototype.onFilterTextBoxChanged = function (val) {
        this.gridApi.setQuickFilter(val);
    };
    //changeRemData(evn) {
    //    if (evn.checked) {
    //        this.LoadReminderForUser();
    //    }
    //    else {
    //        this.LoadAllReminderForUser();
    //    }
    //}
    PrivilageCustomer.prototype.saveCustomer = function (data) {
        var _this = this;
        this.isLoading = true;
        this.Lead.insUpdtRecord(data).subscribe(function (dt) {
            if (data.ID > 0) {
                _this.gridApi.updateRowData({
                    update: [JSON.parse(dt)]
                });
                _this.alert.success("Record Updated successfully");
            }
            else {
                _this.gridApi.updateRowData({
                    add: [JSON.parse(dt)],
                    addIndex: 0
                });
                _this.alert.success("Record inserted successfully");
            }
            _this.isLoading = false;
            _this.onCloseHandled();
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    PrivilageCustomer.prototype.DeleteCustomer = function () {
        var _this = this;
        var selecteditem = this.gridApi.getSelectedRows();
        if (selecteditem.length <= 0) {
            this.alert.error("Please select a record to delete");
            return;
        }
        this.isLoading = true;
        this.Lead.deleteRecord(selecteditem[0]).subscribe(function (dt) {
            if (dt === "true") {
                _this.gridApi.updateRowData({
                    remove: selecteditem
                });
                _this.alert.success("Record deleted successfully");
            }
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    PrivilageCustomer = __decorate([
        core_1.Component({
            selector: 'priv-cust',
            templateUrl: './privcustomer.component.html',
            styleUrls: ['./privcustomer.component.css']
        }),
        __metadata("design:paramtypes", [index_2.PrivCustomer,
            index_2.SideBarService,
            index_2.UserService,
            index_2.AlertService,
            index_3.AuthenticationService])
    ], PrivilageCustomer);
    return PrivilageCustomer;
}());
exports.PrivilageCustomer = PrivilageCustomer;
