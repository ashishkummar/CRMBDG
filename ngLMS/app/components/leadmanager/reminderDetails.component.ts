import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GridOptions } from "ag-grid/main";
import { CalendarModule } from 'primeng/calendar';
import { Message } from 'primeng/api';


import { RecentQueryCellRendrer, communicationCellRendrer, entryDateCellRendrer } from "../index"

import { SideBarService, UserService, AlertService, LeadService } from '../../services/index'

import { AuthenticationService } from '../../authGaurd/index'
import { ILead, ILeadUpdate } from './ILead';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Logger } from 'ag-grid/dist/lib/logger';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'reminder-details',
    templateUrl: './reminderDetails.component.html',
    styleUrls: ['./reminderDetails.component.css']
})

export class ReminderDetailsComponent implements OnInit {

    public gridOptions: GridOptions;
    public gridApi;
    public rowData: any[];
    public columnDefs: any[];
    popMsg: Message[] = [];
    isLoading = false;
    public frameworkComponents: any;
    public getRowHeight: any
    public display = 'none';
    public displayCreateLead = 'none';
    public AssignToUser: number = 1;
    ActiveUsers: any = null;
    leadMsg = [];
    public isAdmin: boolean = false;
    userMessage: string = '';
    currentUserID: number = 0;
    searchToDt: Date = new Date();
    searchFromDt: Date = new Date();
    getRowNodeId;
    public rowSelection = 'single';
    uid;
    selectedLead: ILead = {
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
    }
    public todayReminder: boolean = true;
    updateObj: ILeadUpdate = {
        LeadID: 0,
        AssignID: 0,
        Message: '',
        PostedBy: 0,
        ReminderOn: new Date(),
        Status: 0
    }

    status = [
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

    constructor(
        private Lead: LeadService
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
        , private route: ActivatedRoute

    ) {
        this.route.params.subscribe(params => this.uid=params['userid']);
        this.searchFromDt.setDate(this.searchFromDt.getDate() - 90);
        this.isAdmin = authenticationService.getUserRole();
        if (this.isAdmin) {
            this.rowSelection = "multiple";
        }
        this.currentUserID = authenticationService.getUserID();
        // we pass an empty gridOptions in, so we can grab the api out
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
                headerName: "Lead ID", field: "leadID", width: 185
                , checkboxSelection: this.isAdmin
                , headerCheckboxSelection: this.isAdmin
                , headerCheckboxSelectionFilteredOnly: this.isAdmin
            },
            { headerName: "Name", field: "leadName" },
            { headerName: "Contact", field: "leadContact" },
            { headerName: "Email", field: "leadEmail" },
            { headerName: "Lead Source", field: "leadSource" },
            { headerName: "Lead Type", field: "leadType" },
            {
                headerName: "Requirement/Query", field: "leadQuery", tooltip: function (params: any) {
                    return params.value;
                }, width: 350, cellRenderer: "communicationCell"
            },
            {
                headerName: "Recent Activity", field: "leadLastComm",
                cellStyle: function (params: any) {
                    if (params.data.lastComBy === 1) {
                        return { color: '#fff', backgroundColor: 'red' };
                    } else {
                        return { color: '', backgroundColor: '' };;
                    }
                }
                , cellRenderer: "recentQuerycellRendrer"
                , tooltip: function (params: any) {
                    return params.value;
                }, width: 250
            },
            {
                headerName: "Status", field: "status.value", tooltip: function (params: any) {
                    if (params.data.status.id == 3 || params.data.status.id == 6)
                        return params.data.reminderDate;
                }
            },
            { headerName: "Assignee", field: "leadAssignee" },
            { headerName: "Reminder on", field: "reminderDate", cellRenderer: "entryDateCell" },
            { headerName: "Entry Date", field: "leadEntryDate", cellRenderer: "entryDateCell" }
        ];

        this.frameworkComponents = {
            recentQuerycellRendrer: RecentQueryCellRendrer,
            communicationCell: communicationCellRendrer,
            entryDateCell: entryDateCellRendrer
        };

        this.gridOptions.getRowHeight = function (params: any) {
            return 50;
        }
        this.getRowNodeId = function (data) {
            return data.leadID;
        };

        this.LoadAllReminderForUser(this.uid);
    }

    LoadReminderForUser(uid) {
        this.isLoading = true;
        this.Lead.getReminders(uid).subscribe(
            data => {
                this.rowData = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });

    }

    LoadAllReminderForUser(uid) {
        this.isLoading = true;
        this.Lead.getAllReminders(uid).subscribe(
            data => {
                this.rowData = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });

    }

    ngOnInit() {
        this.sideBarService.setPageTitle('Reminder Details');
    }

    openModal(params: any) {
        this.isLoading = true;
        this.selectedLead = params.data;
        if (params.data.reminderDate != null) {
            this.selectedLead.reminderDate = new Date(this.selectedLead.reminderDate);
        }
        else {
            this.selectedLead.reminderDate = new Date();
        }
        this.leadMsg = [];
        this.Lead.getLeadMsgByLeadID(params.data.leadID).subscribe(
            data => {
                this.leadMsg = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
        this.display = 'block';
    }

    onCloseHandled() {
        this.display = 'none';
    }

    updateLead() {

        this.updateObj.LeadID = this.selectedLead.leadID;
        this.updateObj.AssignID = this.selectedLead.uid;
        this.updateObj.Message = this.userMessage;
        this.updateObj.PostedBy = this.currentUserID;
        this.updateObj.ReminderOn = new Date(this.selectedLead.reminderDate);
        this.updateObj.Status = this.selectedLead.status.id;
        this.isLoading = false;
        this.Lead.updatelead(this.updateObj).subscribe(
            data => {
                // var rowNode = this.gridApi.getRowNode(this.selectedLead.leadID);
                // rowNode.setData(JSON.parse(data));
                this.gridApi.updateRowData({
                    update: [JSON.parse(data)]
                });

                this.isLoading = false;
                this.onCloseHandled();
                this.alert.success("Record Updated successfully", 5000);
                this.sideBarService.updateReminderCount(this.uid);
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    updateAllMessages() {

    }

    onFilterTextBoxChanged(val: string) {
        this.gridApi.setQuickFilter(val);
    }

    changeRemData(evn) {
        if (evn.checked) {
            this.LoadAllReminderForUser(this.uid);
        }
        else {
            this.LoadReminderForUser(this.uid);
        }
    }

    downloadPdf() {
        this.isLoading = true;
        this.Lead.downloadPdf(this.selectedLead).subscribe(
            data => {
                var fileName = "CustomerCommunication" + ".pdf";
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(data, fileName);
                } else {
                    var link = document.createElement('a');
                    link.setAttribute("type", "hidden");
                    link.download = fileName;
                    link.href = window.URL.createObjectURL(data);
                    document.body.appendChild(link);
                    link.click();
                }
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            })
    }
} 