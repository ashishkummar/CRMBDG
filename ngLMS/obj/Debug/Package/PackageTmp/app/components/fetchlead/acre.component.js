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
var AcreComponent = /** @class */ (function () {
    function AcreComponent(Lead, sideBarService, user, alert, authenticationService) {
        var _this = this;
        this.Lead = Lead;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.popMsg = [];
        this.isLoading = false;
        this.display = 'none';
        this.rowSelection = 'single';
        this.isAdmin = false;
        this.selectapi = 1;
        this.searchFromDt = new Date();
        this.searchToDt = new Date();
        this.maxDate = new Date();
        this.apiUserID = 'bdgreen@99';
        this.displayProgress = 'none';
        this.progressPer = 0;
        this.indexNo = 0;
        this.LastFetchMsg = '';
        this.searchFromDt.setDate(this.searchFromDt.getDate() - 2);
        this.isAdmin = authenticationService.getUserRole();
        if (this.isAdmin) {
            this.rowSelection = "multiple";
        }
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
                headerName: "S. No.", field: "uniqueID",
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
                }, cellRenderer: "recentQuerycellRendrer"
            },
            { headerName: "Entry Date", field: "leadEntryDate", cellRenderer: "entryDateCell" }
        ];
        this.frameworkComponents = {
            recentQuerycellRendrer: index_1.RecentQueryCellRendrer,
            entryDateCell: index_1.entryDateCellRendrer
        };
        this.getRowNodeId = function (data) {
            return data.uniqueID;
        };
        this.gridOptions.getRowHeight = function (params) {
            return 50;
        };
        this.rowData = []; //JSON.parse("[{\"leadID\":0,\"leadName\":\"Amardeep singh\",\"leadContact\":\"7599485878\",\"leadEmail\":\"amar212b@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"This user is looking for 3 BHK Multistorey Apartment for Sale in Omicron 1, Greater Noida and has viewed your contact details.\",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T15:38:13\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-153813-7599485878\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"},{ \"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"}]");;
        this.getLastFetchDetails();
    }
    AcreComponent.prototype.ngOnInit = function () {
        this.sideBarService.setPageTitle('99Acres Api');
    };
    AcreComponent.prototype.getLastFetchDetails = function () {
        var _this = this;
        this.isLoading = true;
        this.Lead.getLastFetch('2').subscribe(function (data) {
            _this.LastFetchMsg = "Last Lead Fetched at: " + data;
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    AcreComponent.prototype.fetchLead = function () {
        var _this = this;
        var datDif = Math.ceil((this.searchToDt.valueOf() - this.searchFromDt.valueOf()) / (1000 * 3600 * 24));
        if (datDif < 0) {
            this.alert.error("Invalid date range selected");
            return false;
        }
        if (datDif > 2) {
            this.alert.error("5 Days record is allowed at a time");
            return false;
        }
        this.isLoading = true;
        this.Lead.getMagicLead(this.selectapi, this.searchFromDt, this.searchToDt).subscribe(function (data) {
            _this.rowData = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    AcreComponent.prototype.deleteSelection = function () {
        var selectedRec = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedRec });
    };
    AcreComponent.prototype.saveToDB = function () {
        this.displayProgress = 'block';
        this.saveLead(this.gridApi.getDisplayedRowCount());
    };
    AcreComponent.prototype.saveLead = function (count) {
        var _this = this;
        if (this.indexNo < count) {
            this.Lead.insertApilead(this.gridApi.getDisplayedRowAtIndex(this.indexNo).data).subscribe(function (data) {
                var retobj = JSON.parse(data);
                if (retobj.leadID > 0) {
                    _this.progressPer = Math.floor(((_this.indexNo + 1) / count) * 100);
                    _this.indexNo = _this.indexNo + 1;
                    _this.saveLead(count);
                }
                else {
                    _this.alert.error('Error! Operation aborted', 0);
                }
            }, function (error) {
                _this.alert.error(error, 0);
                _this.progressPer = Math.floor(((_this.indexNo + 1) / count) * 100);
                _this.indexNo = _this.indexNo + 1;
                _this.saveLead(count);
            });
        }
        else {
            this.displayProgress = 'none';
            this.indexNo = 0;
            this.alert.success('Record saved successfully', 0);
        }
    };
    AcreComponent = __decorate([
        core_1.Component({
            selector: 'acre-source',
            templateUrl: './acre.component.html',
            styleUrls: ['./acre.component.css']
        }),
        __metadata("design:paramtypes", [index_2.LeadService,
            index_2.SideBarService,
            index_2.UserService,
            index_2.AlertService,
            index_3.AuthenticationService])
    ], AcreComponent);
    return AcreComponent;
}());
exports.AcreComponent = AcreComponent;
