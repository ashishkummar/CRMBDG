import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GridOptions } from "ag-grid/main";
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';

import { RecentQueryCellRendrer, communicationCellRendrer, entryDateCellRendrer } from "../index"

import { SideBarService, UserService, AlertService, LeadService } from '../../services/index'

import { AuthenticationService } from '../../authGaurd/index'
import { ILead, ILeadUpdate } from './ILead';
import { DropDownHelper } from './LeadConfig';
import { Response } from '@angular/http/src/static_response';
import { ISendSms } from '../sms/ISms';

@Component({
    selector: 'lead-manager',
    templateUrl: './leadManager.component.html',
    styleUrls: ['./leadManager.component.css']
})

export class LeadManagerComponent implements OnInit {

    public gridOptions: GridOptions;
    public gridApi;
    public rowData: any[];
    public columnDefs: any[];
    isLoading = false;
    public frameworkComponents: any;
    public getRowHeight: any
    public display = 'none';
    public displayCreateLead = 'none';
    public displaySendSms = 'none';
    public displayChat = 'none';
    public quickFilterTxt = '';
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
    public displayUserRpt = false;
    public userAssingChartData = {};
    public ChartData = {
        labels: ['New', 'Answered', 'Scheduled', "Deactivated", "Closed", "Visited", "Broker", "Rent", "Hot"],
        datasets: [
            {
                data: [0,0,0,0,0,0,0,0,0],
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
            }]
    };
    public totalRecord = 0;
    public newRecord = 0;
    public AnsRecord = 0;
    public SchRecord = 0;
    public VisRecord = 0;
    public broRecord = 0;
    public HotRecord = 0;
    public CloRecord = 0;
    public DeactRecord = 0;
    public selectedUser = 'All';
    public selectedSource = '';
    public selectedStatus = '';
    public enableWap = false;
    public userChanged = true;
    public whatsAppMsg = '';
    public userMobileNumber = '';
    dropDownHelper: DropDownHelper;
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
    private bulkUserAssign: ILead[];

    updateObj: ILeadUpdate = {
        LeadID: 0,
        AssignID: 0,
        Message: '',
        PostedBy: 0,
        ReminderOn: new Date(),
        Status: 0
    }
    status=[];
    LeadSource = [];
    searchOnCreated = false;
    constructor(
        private Lead: LeadService
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
        , private confirmationService: ConfirmationService

    ) {

        this.dropDownHelper = new DropDownHelper();
        this.status = this.dropDownHelper.getLeadStatus();
        this.LeadSource = this.dropDownHelper.getLeadSource();
        this.searchFromDt.setDate(this.searchFromDt.getDate() - 180);
        this.isAdmin = authenticationService.getUserRole();
        if (this.isAdmin) {
            this.rowSelection = "multiple";
            var myObj = this.dropDownHelper.config();
            this.enableWap = myObj.find(x => x.id === 'enableWAP').value;
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
            { headerName: "Email", field: "leadEmail", width: 450},
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
                }, width: 350
            },
            {
                headerName: "Status", field: "status.value", tooltip: function (params: any) {
                    if (params.data.status.id == 3 || params.data.status.id == 6)
                        return params.data.reminderDate;
                }
            },
            { headerName: "Assignee", field: "leadAssignee" },
            { headerName: "Assigned on", field: "lastUpdatedOn", cellRenderer: "entryDateCell" },
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
        this.LoadLeadForUser();
        this.sideBarService.updateReminderCount(this.authenticationService.getUserID());
    }

    ngOnInit() {
        this.sideBarService.setPageTitle('Lead Bank');
    }

    openModal(params: any) {
        this.isLoading = true;
        this.selectedLead = params.data;
        if (params.data.reminderDate != null) {
            this.selectedLead.reminderDate = new Date(this.selectedLead.reminderDate);
        }
        else {
            var d = new Date(); d.setHours(1, 0, 0, 0);
            this.selectedLead.reminderDate = d;
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
        this.displayCreateLead = 'none';
        this.displaySendSms = 'none';
        this.displayChat = 'none';
        this.gridApi.deselectAll();
    }

    displayChart() {
        this.displayUserRpt = false;
        this.isLoading = true;
        let lable: string[] = ['New', 'Answered', 'Scheduled', "Deactivated", "Closed", "Visited", "Broker", "Rent", "Hot"];
        let list: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
    }

    assignRtp() {
        this.displayUserRpt = true;
        this.isLoading = true;
        let user: string[] = [];
        let leadcount: number[] = [];
        var count = this.gridApi.getDisplayedRowCount();
        for (var i = 0; i < count; i++) {
            var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
            var assignTo = rowNode.data.leadAssignee;
            if (assignTo == '') {
                assignTo ='Unassigned Leads'
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
        }
        this.isLoading = false;
        this.displayChat = 'block';
    }

    LoadLeadForUser() {
        var datDif: number = Math.ceil((this.searchToDt.valueOf() - this.searchFromDt.valueOf()) / (1000 * 3600 * 24));
        if (datDif < 0) {
            this.alert.error("Invalid date range selected", 5000);
            return false;
        }
        if (datDif > 180) {
            this.alert.error("180 Days record is allowed at a time", 5000);
            return false;
        }

        this.isLoading = true;
        this.clearAllFilter(true);
        if (!this.searchOnCreated) {
            this.Lead.getLeadByDate(this.searchFromDt, this.searchToDt).subscribe(
                data => {
                    this.rowData = JSON.parse(data).Lead;
                    this.ChartData = this.generateDataset([0, 0, 0, 0, 0, 0, 0, 0, 0], null);
                    if (this.ActiveUsers == null && this.isAdmin == true) {
                        this.LoadUsers();
                    }
                    else {
                        this.isLoading = false;
                    }
                },
                error => {
                    this.isLoading = false;
                    this.alert.error(error, 5000);
                });
        } else {
            this.Lead.getLeadByCreatedDate(this.searchFromDt, this.searchToDt).subscribe(
                data => {
                    this.rowData = JSON.parse(data).Lead;
                    this.ChartData = this.generateDataset([0, 0, 0, 0, 0, 0, 0, 0, 0], null);
                    if (this.ActiveUsers == null && this.isAdmin == true) {
                        this.LoadUsers();
                    }
                    else {
                        this.isLoading = false;
                    }
                },
                error => {
                    this.isLoading = false;
                    this.alert.error(error, 5000);
                });
        }

    }

    onFilterTextBoxChanged(val: string) {
        this.gridApi.setQuickFilter(val);
    }

    LoadUsers() {
        this.user.getAllUsers().subscribe(
            data => {
                this.ActiveUsers = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    updateLead() {

        this.updateObj.LeadID = this.selectedLead.leadID;
        this.updateObj.AssignID = this.selectedLead.uid;
        this.updateObj.Message = this.userMessage;
        this.updateObj.PostedBy = this.currentUserID;
        this.updateObj.ReminderOn = new Date(this.selectedLead.reminderDate);
        this.updateObj.Status = this.selectedLead.status.id;
        this.isLoading = true;
        this.Lead.updatelead(this.updateObj).subscribe(
            data => {
               // var rowNode = this.gridApi.getRowNode(this.selectedLead.leadID);
               // rowNode.setData(JSON.parse(data));
                this.gridApi.updateRowData({
                    update: [JSON.parse(data)]
                });
                this.userMessage = "";
                this.isLoading = false;
                this.onCloseHandled();
                this.alert.success("Record Updated successfully", 5000);
                this.sideBarService.updateReminderCount(this.isAdmin ? this.selectedUser === 'All' ? 1 : this.selectedUser : this.authenticationService.getUserID());
                this.statusBarRecalculate();
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    updateAllMessages() {
        this.isLoading = true;
        this.updateObj.LeadID = this.selectedLead.leadID;
        this.Lead.deleteAllMsg(this.updateObj).subscribe(
            data => {
                this.gridApi.updateRowData({
                    update: [JSON.parse(data)]
                });
                this.leadMsg = [];
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    addNewLead() {
        this.displayCreateLead = 'block';
    }

    sendSmsToUser() {
        var mobile = this.getUserMobile();
        if (mobile.length > 0) {
            this.displaySendSms = 'block';
        }
    }

    SaveLead(data: ILead) {
        this.isLoading = true;
        this.Lead.insertlead(data).subscribe(
            data => {
                this.gridApi.updateRowData({
                    add: [JSON.parse(data)],
                    addIndex: 0
                });
                this.calculateRecordCount();
                this.onCloseHandled();
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    export() {
        var params = {
            columnSeparator: ','
        };
        this.gridApi.exportDataAsCsv(params);
    }

    assignTo() {
        this.bulkUserAssign = [];
        this.gridApi.forEachNodeAfterFilter(this.bulkAssignCallBack.bind(null, this));
        if (this.bulkUserAssign.length <= 0) {
            this.alert.error("Please select record to update assignee.", 5000);
            return false;
        }
        this.isLoading = true;
        for (var i = 0; i < this.bulkUserAssign.length; i++) {
            this.bulkUserAssign[i].uid = this.AssignToUser;
        }
        
        this.Lead.updateLeadAssinee(this.bulkUserAssign).subscribe(
            data => {
            this.whatsAppMsg = '';
            var rowdata = JSON.parse(data);
            if (rowdata.Lead.length>0) {
                for (var i = 0; i < rowdata.Lead.length; i++) {
                    this.gridApi.updateRowData({
                        update: [rowdata.Lead[i]]
                    });
                    this.whatsAppMsg += rowdata.Lead[i].leadName.toUpperCase() + ',' + rowdata.Lead[i].leadContact + ',' + rowdata.Lead[i].leadEmail;
                    //if (this.getProjectNameFromString(rowdata.Lead[i].leadQuery) !== '') {
                    //    this.whatsAppMsg += ',' + this.getProjectNameFromString(rowdata.Lead[i].leadQuery) + '.\n';
                    //}
                    //else {
                    //    this.whatsAppMsg += '.\n';
                    //}
                }
                this.statusBarRecalculate();
                if (rowdata.Msg === null) {
                    this.alert.success("Lead successfully assigned to selected user", 5000);
                }
                this.userChanged = false;
                if (this.whatsAppMsg.length > 0) {
                    this.sendSmsToUser();
                }
                this.gridApi.deselectAll();
            }
            if (rowdata.Msg !== null) {
                this.alert.warn(rowdata.Msg, 0);
            }
            this.isLoading = false;
        },
        error => {
            this.isLoading = false;
            this.alert.error(error, 5000);
        });
    }

    getProjectNameFromString(qry) {
        if (qry.toLowerCase().includes("garu atulyam"))
            return "Garu Atulyam";
        else if (qry.toLowerCase().includes("yamuna city"))
            return "Gaur Yamuna City";
        else if (qry.toLowerCase().includes("omicron"))
            return "Garu Atulyam";
        else if (qry.toLowerCase().includes("gaur city"))
            return "Gaur City";
        else
            return "";
    }

    chartClicked(event, rpttype) {
        if (rpttype === 1) {
            var countryFilterComponent = this.gridApi.getFilterInstance("status.value");
            countryFilterComponent.setModel({
                type: "startsWith",
                filter: event.element._view.label
            });
            this.gridApi.onFilterChanged();
        }
        else if (rpttype===2){
            var countryFilterComponent = this.gridApi.getFilterInstance("leadAssignee");
            countryFilterComponent.setModel({
                type: "startsWith",
                filter: event.element._view.label
            });
            this.gridApi.onFilterChanged();
        }
        this.onCloseHandled();
        
    }

    clearAllFilter(updateuser=true) {
        if (this.gridApi !== undefined) {
            this.gridApi.setFilterModel(null);
            this.onFilterTextBoxChanged("");
            this.calculateRecordCount();
        }
        this.quickFilterTxt = "";
        if (updateuser)
        this.selectedUser = 'All';
        this.selectedSource = '';
        this.selectedStatus = '';
    }

    generateDataset(dt,lbl) {
        return {
            labels: lbl === null ? ['New', 'Answered', 'Scheduled', "Deactivated", "Closed", "Visited", "Broker", "Rent", "Hot"] :lbl,
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
                }]
        };
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
                this.Lead.Deletelead(this.gridApi.getSelectedRows()).subscribe(
                    data => {
                        var rowdata = JSON.parse(data);
                        for (var i = 0; i < rowdata.length; i++) {
                            this.gridApi.updateRowData({
                                remove: [rowdata[i]]
                            });
                        }
                        this.alert.success("Lead deleted successfully", 5000);
                        this.gridApi.deselectAll();
                        this.isLoading = false;
                        this.calculateRecordCount();
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

    onSourceChange(val, type) {
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
                if (this.selectedUser !== '0') {
                    this.sideBarService.updateReminderCount(this.isAdmin ? this.selectedUser === 'All' ? 1 : this.selectedUser : this.authenticationService.getUserID());
                }
                else {
                    val = '   ';
                }
                this.clearAllFilter(false);
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
            if (type == '3' || type == '2') {
                this.calculateRecordCount();
            }
        }

    }

    statusBarRecalculate() {
        var filterModel = this.gridApi.getFilterModel();
        var countryFilterComponent = this.gridApi.getFilterInstance("status.value");
        countryFilterComponent.setModel({
            type: "startsWith",
            filter: ''
        });
        this.gridApi.onFilterChanged();
        this.calculateRecordCount();
        this.gridApi.setFilterModel(filterModel);
        this.gridApi.onFilterChanged();
    }

    calculateRecordCount() {

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

    downloadFile(data: Response) {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = window.URL.createObjectURL(blob);
        window.location.href=url;
    }

    whatsAppUser() {
        if (this.whatsAppMsg.length > 0) {
            var userMobile = '';
            if (this.AssignToUser && this.AssignToUser > 0) {
                for (var i = 0; i < this.ActiveUsers.length; i++) {
                    if (this.ActiveUsers[i].id == this.AssignToUser) {
                        if (this.ActiveUsers[i].contact.length > 10) {
                            this.userMobileNumber = this.ActiveUsers[i].contact.substring(this.ActiveUsers[i].contact.length - 10, this.ActiveUsers[i].contact.length);
                            var userMobile = '91' + this.userMobileNumber;

                        }
                        else if (this.ActiveUsers[i].contact.length === 10) {
                            this.userMobileNumber = this.ActiveUsers[i].contact;
                            var userMobile = '91' + this.userMobileNumber;
                            break;
                        }
                        else {
                            this.alert.error('Mobile number should be of 10 digit', 5000);
                        }
                    }
                }
            }
            if (userMobile != '' && userMobile.length===12) {
                window.open('https://api.whatsapp.com/send?phone=' + userMobile + '&text=' + encodeURI(this.whatsAppMsg) + '&source=&data=', '_blank');
            }
            else {
                this.alert.error('Invalid user mobile number', 5000);
            }
        }
        else {
            this.alert.error('Message is not generated to send', 5000);
        }
    }

    getUserMobile() {
        this.userMobileNumber = '';
        if (this.AssignToUser && this.AssignToUser > 0) {
            for (var i = 0; i < this.ActiveUsers.length; i++) {
                if (this.ActiveUsers[i].id == this.AssignToUser) {
                    if (this.ActiveUsers[i].contact.length > 10) {
                        this.userMobileNumber = this.ActiveUsers[i].contact.substring(this.ActiveUsers[i].contact.length - 10, this.ActiveUsers[i].contact.length);

                    }
                    else if (this.ActiveUsers[i].contact.length === 10) {
                        this.userMobileNumber = this.ActiveUsers[i].contact;
                        break;
                    }
                }
            }
        }
        return this.userMobileNumber;
    }

    assignUserChange() {
        this.userChanged = true;
        this.whatsAppMsg = '';
    }

    sendUserSms(sms: ISendSms) {
        this.isLoading = true;
        this.Lead.sendSms(sms).subscribe(data => {
            if (JSON.parse(data) === 'Message Send Successfully.') {
                this.alert.success(JSON.parse(data), 5000);
            }
            else {
                this.alert.error(JSON.parse(data), 5000);
            }
            this.onCloseHandled();
            this.isLoading = false;
        }, error => {
            this.isLoading = false;
            this.alert.error(error, 5000);
        })
    }
    //callBacks
    bulkAssignCallBack(self, node) {
        if (node.isSelected()) {
            self.bulkUserAssign.push(node.data);
        }
    }

} 