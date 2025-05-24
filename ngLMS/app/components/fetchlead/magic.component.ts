import {
    Component, Input, OnInit, Output, EventEmitter
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Message } from 'primeng/api';
import { GridOptions } from "ag-grid/main";
import { RecentQueryCellRendrer, entryDateCellRendrer } from "../index"
import { SideBarService, UserService, AlertService, LeadService } from '../../services/index'

import { AuthenticationService } from '../../authGaurd/index'
import { ILead } from '../leadmanager/ILead';

@Component({
    selector: 'Magic-source',
    templateUrl: './magic.component.html',
    styleUrls: ['./magic.component.css']
})
export class MagicComponent implements OnInit{

    popMsg: Message[] = [];
    public gridApi;
    isLoading = false;
    public display = 'none';
    getRowNodeId;
    public rowData: any[];
    public rowSelection = 'single';
    public columnDefs: any[];
    public gridOptions: GridOptions;
    public frameworkComponents: any;
    public isAdmin: boolean = false;
    public selectapi: number = 1;
    public searchFromDt: Date = new Date();
    public searchToDt: Date = new Date();
    public maxDate: Date = new Date();
    public displayProgress = 'none';
    public progressPer = 0;
    public indexNo = 0;
    public LastFetchMsg = '';

    public sources = [
        { id: "1", value: "API1" },
        { id: "2", value: "API2" }
    ];
    ngOnInit() {
        this.sideBarService.setPageTitle('Magic Bricks Api');
    }
    constructor(
        private Lead: LeadService
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
    ) {
        this.searchFromDt.setDate(this.searchFromDt.getDate() - 5);
        this.maxDate.setDate(this.maxDate.getDate() + 1);
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
                headerName: "S. No.", field: "uniqueID"
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
                }, cellRenderer: "recentQuerycellRendrer"
            },
            { headerName: "Entry Date", field: "leadEntryDate", cellRenderer: "entryDateCell" }
        ];
        this.frameworkComponents = {
            recentQuerycellRendrer: RecentQueryCellRendrer,
            entryDateCell: entryDateCellRendrer
        };
        this.getRowNodeId = function (data) {
            return data.uniqueID;
        };
        this.gridOptions.getRowHeight = function (params: any) {
            return 50;
        }
        this.rowData = [];//JSON.parse("[{\"leadID\":0,\"leadName\":\"Amardeep singh\",\"leadContact\":\"7599485878\",\"leadEmail\":\"amar212b@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"This user is looking for 3 BHK Multistorey Apartment for Sale in Omicron 1, Greater Noida and has viewed your contact details.\",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T15:38:13\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-153813-7599485878\"},{\"leadID\":0,\"leadName\":\"mohit chadda\",\"leadContact\":\"9891366253\",\"leadEmail\":\"bdgreenhome@gmail.com\",\"leadSource\":\"Magicbriks\",\"leadType\":\"Individual\",\"leadQuery\":\"Gaur Atulyam, Greater Noida - null Additional Details - \",\"leadLastComm\":null,\"leadLastCommDt\":null,\"status\":null,\"reminderDate\":null,\"leadAssignee\":null,\"leadEntryDate\":\"2018-05-17T13:44:51\",\"lastUpdatedOn\":null,\"lastComBy\":null,\"uid\":null,\"uniqueID\":\"20180517-134451-9891366253\"}]");;
        this.getLastFetchDetails();
    }

    getLastFetchDetails() {
        this.isLoading = true;
        this.Lead.getLastFetch('1').subscribe(
            data => {
                this.LastFetchMsg = "Last Lead Fetched at: " + data;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    fetchLead() {
        var datDif: number = Math.ceil((this.searchToDt.valueOf() - this.searchFromDt.valueOf()) / (1000 * 3600 * 24));
        if (datDif < 0) {
            this.alert.error("Invalid date range selected", 5000);
            return false;
        }
        if (datDif > 5) {
            this.alert.error("5 Days record is allowed at a time", 5000);
            return false;
        }
        this.isLoading = true;
       
        this.Lead.getMagicLead(this.selectapi, this.searchFromDt, this.searchToDt).subscribe(
            data => {
                this.rowData = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    deleteSelection() {
        var selectedRec = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedRec });
    }


    saveToDB() {
        this.displayProgress = 'block';
        this.saveLead(this.gridApi.getDisplayedRowCount());
    }

    saveLead(count) {
        if (this.indexNo < count) {
            this.Lead.insertApilead(this.gridApi.getDisplayedRowAtIndex(this.indexNo).data).subscribe(
                data => {
                    var retobj = JSON.parse(data);
                    if (retobj.leadID > 0) {
                        this.progressPer = Math.floor(((this.indexNo + 1) / count) * 100);
                        this.indexNo = this.indexNo + 1;
                        this.saveLead(count);
                    }
                    else {
                        this.alert.error('Error! Operation aborted', 5000);
                    }
                },
                error => {
                    this.alert.error(error, 5000);
                    this.progressPer = Math.floor(((this.indexNo + 1) / count) * 100);
                    this.indexNo = this.indexNo + 1;
                    this.saveLead(count);
                });
        }
        else {
            this.displayProgress = 'none';
            this.indexNo = 0;
            this.alert.success('Record saved successfully', 5000);
        }
    }
} 