import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { ConfirmationService } from 'primeng/api';

import { SideBarService, UserService, AlertService, ProjectService } from '../../services/index'
import { AuthenticationService } from '../../authGaurd/index'
import { IProject } from './IProject';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
    public gridOptions: GridOptions;
    public gridApi;
    public rowData: any[];
    public columnDefs: any[];
    isLoading = false;
    public displayCreateProject = 'none';
    public quickFilterTxt = '';
    getRowNodeId;
    public rowSelection = 'single';
    isAdmin = false;

    constructor(
        private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
        , private confirmationService: ConfirmationService
        , private projectService: ProjectService
    ) {

        this.isAdmin = authenticationService.getUserRole();
        if (this.isAdmin) {
            this.rowSelection = "multiple";
        }

        this.gridOptions = <GridOptions>{
            onGridReady: (params) => {
                if (params) {
                    params.api.sizeColumnsToFit();
                    this.gridApi = params.api;
                }
            },
        };

        this.columnDefs = [
            {
                headerName: "Project ID", field: "Project_ID", width: 185, hide: true

            },
            {
                headerName: "Project Name", field: "Project_Name", checkboxSelection: this.isAdmin
                , headerCheckboxSelection: this.isAdmin
                , headerCheckboxSelectionFilteredOnly: this.isAdmin },
            { headerName: "Project Type", field: "Project_Type" },
            { headerName: "Location", field: "Project_Location" },
            {
                headerName: "Project Details",
                children: [
                    {
                        headerName: "Zip", field: "Project_File", cellRenderer: function (params) {
                            return '<a href="' + params.value + '" target="_blank" style="color: #000;"><i class="fa fa-file-archive-o" aria-hidden="true"></i></a>'
                        }
                    },
                    {
                        headerName: "URL", field: 'Project_URL', cellRenderer: function (params) {
                            return '<a href="' + params.value +'" target="_blank" style="color: #000;">' + params.value + '</a>'
                        } },

                ]
            },
            { headerName: "Last Updated date", field: "Project_Updated" },
        ];

        this.getRowNodeId = function (data) {
            return data.Project_ID;
        };

        this.LoadAllProject();
    }

    ngOnInit() {
        this.sideBarService.setPageTitle('Projects');
    }

    LoadAllProject() {
        this.isLoading = true;
        this.projectService.getAllProject().subscribe(
            data => {
                this.rowData = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    onCloseHandled() {
        this.displayCreateProject = 'none';
    }
    addNewProject() {
        this.displayCreateProject = 'block';
    }
    SaveProject(data: IProject) {
        this.isLoading = true;
        this.projectService.insertProject(data).subscribe(
            data => {
                this.gridApi.updateRowData({
                    add: [JSON.parse(data)],
                    addIndex: 0
                });
                this.onCloseHandled();
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    clearAllFilter() {
        this.gridApi.setFilterModel(null);
        this.quickFilterTxt = "";
        this.onFilterTextBoxChanged("");
    }
    onFilterTextBoxChanged(val: string) {
        this.gridApi.setQuickFilter(val);
    }

    deleteConfirm() {

        if (this.gridApi.getSelectedRows().length <= 0) {
            this.alert.error("Please select record to delete.", 5000);
            return false;
        }

        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.isLoading = true;
                this.projectService.deleteProject(this.gridApi.getSelectedRows()).subscribe(
                    data => {
                        var rowdata = JSON.parse(data);
                        for (var i = 0; i < rowdata.length; i++) {
                            this.gridApi.updateRowData({
                                remove: [rowdata[i]]
                            });
                        }
                        this.alert.success("Project deleted successfully", 5000);
                        this.gridApi.deselectAll();
                        this.isLoading = false;
                    },
                    error => {
                        this.isLoading = false;
                        this.alert.error(error, 5000);
                    });
            },
            reject: () => {

            }
        });
    }
}