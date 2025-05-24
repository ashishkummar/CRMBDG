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
var index_1 = require("../../services/index");
var index_2 = require("../../authGaurd/index");
var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(sideBarService, user, alert, authenticationService, confirmationService, projectService) {
        var _this = this;
        this.sideBarService = sideBarService;
        this.user = user;
        this.alert = alert;
        this.authenticationService = authenticationService;
        this.confirmationService = confirmationService;
        this.projectService = projectService;
        this.isLoading = false;
        this.displayCreateProject = 'none';
        this.quickFilterTxt = '';
        this.rowSelection = 'single';
        this.isAdmin = false;
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
                headerName: "Project ID", field: "Project_ID", width: 185, hide: true
            },
            {
                headerName: "Project Name", field: "Project_Name", checkboxSelection: this.isAdmin,
                headerCheckboxSelection: this.isAdmin,
                headerCheckboxSelectionFilteredOnly: this.isAdmin
            },
            { headerName: "Project Type", field: "Project_Type" },
            { headerName: "Location", field: "Project_Location" },
            {
                headerName: "Project Details",
                children: [
                    {
                        headerName: "Zip", field: "Project_File", cellRenderer: function (params) {
                            return '<a href="' + params.value + '" target="_blank" style="color: #000;"><i class="fa fa-file-archive-o" aria-hidden="true"></i></a>';
                        }
                    },
                    {
                        headerName: "URL", field: 'Project_URL', cellRenderer: function (params) {
                            return '<a href="' + params.value + '" target="_blank" style="color: #000;">' + params.value + '</a>';
                        }
                    },
                ]
            },
            { headerName: "Last Updated date", field: "Project_Updated" },
        ];
        this.getRowNodeId = function (data) {
            return data.Project_ID;
        };
        this.LoadAllProject();
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.sideBarService.setPageTitle('Projects');
    };
    ProjectComponent.prototype.LoadAllProject = function () {
        var _this = this;
        this.isLoading = true;
        this.projectService.getAllProject().subscribe(function (data) {
            _this.rowData = JSON.parse(data);
            _this.isLoading = false;
        }, function (error) {
            _this.isLoading = false;
            _this.alert.error(error, 0);
        });
    };
    ProjectComponent.prototype.onCloseHandled = function () {
        this.displayCreateProject = 'none';
    };
    ProjectComponent.prototype.addNewProject = function () {
        this.displayCreateProject = 'block';
    };
    ProjectComponent.prototype.SaveProject = function (data) {
        var _this = this;
        this.isLoading = true;
        this.projectService.insertProject(data).subscribe(function (data) {
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
    ProjectComponent.prototype.clearAllFilter = function () {
        this.gridApi.setFilterModel(null);
        this.quickFilterTxt = "";
        this.onFilterTextBoxChanged("");
    };
    ProjectComponent.prototype.onFilterTextBoxChanged = function (val) {
        this.gridApi.setQuickFilter(val);
    };
    ProjectComponent.prototype.deleteConfirm = function () {
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
                _this.projectService.deleteProject(_this.gridApi.getSelectedRows()).subscribe(function (data) {
                    var rowdata = JSON.parse(data);
                    for (var i = 0; i < rowdata.length; i++) {
                        _this.gridApi.updateRowData({
                            remove: [rowdata[i]]
                        });
                    }
                    _this.alert.success("Project deleted successfully");
                    _this.gridApi.deselectAll();
                    _this.isLoading = false;
                }, function (error) {
                    _this.isLoading = false;
                    _this.alert.error(error, 0);
                });
            },
            reject: function () {
            }
        });
    };
    ProjectComponent = __decorate([
        core_1.Component({
            selector: 'project',
            templateUrl: './project.component.html',
            styleUrls: ['./project.component.css']
        }),
        __metadata("design:paramtypes", [index_1.SideBarService,
            index_1.UserService,
            index_1.AlertService,
            index_2.AuthenticationService,
            api_1.ConfirmationService,
            index_1.ProjectService])
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
