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
import { DropDownHelper } from '../leadmanager/LeadConfig';

@Component({
    selector: 'csv-source',
    templateUrl: './csv.component.html',
    styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit{

    popMsg: Message[] = [];
    isLoading = false;
    public isAdmin: boolean = false;
    public rowSelection = 'single';
    public gridOptions: GridOptions;
    public gridApi;
    public columnDefs: any[];
    public frameworkComponents: any;
    getRowNodeId;
    public rowData: any[];
    public displayProgress = 'none';
    public displayInst = 'none';
    public indexNo = 0;
    public progressPer = 0;
    public saveErrorList: string = "";
    LeadSource = [];
    LeadType = [];
    dropDownHelper: DropDownHelper;

    ngOnInit() {
        this.sideBarService.setPageTitle('CSV Upload');
    }
    constructor(
        private Lead: LeadService
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
    ) {
        this.isAdmin = authenticationService.getUserRole();
        this.dropDownHelper = new DropDownHelper();
        this.LeadSource = this.dropDownHelper.getLeadSource();
        this.LeadType = this.dropDownHelper.getLeadType();
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
            {
                headerName: "Lead Source", field: "leadSource" },
            { headerName: "Lead Type", field: "leadType" },
            {
                headerName: "Requirement/Query", field: "leadQuery", tooltip: function (params: any) {
                    return params.value;
                }, cellRenderer: "recentQuerycellRendrer"
            }
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
    }

    fileChange(event) {

        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.isLoading = true;
            let file: File = fileList[0];
           // let formData: FormData = new FormData();
           // formData.append('uploadFile', file, file.name);
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let csv: string = reader.result as string;
                //console.log(csv);
                let errorList: string = "";
                let allTextLines = csv.split(/\r|\n|\r/);
                let headers = allTextLines[0].split(',');
                let lines = [];

                for (let i = 1; i < allTextLines.length; i++) {
                    // split content based on comma
                    let reqPush = true;
                    let data = allTextLines[i].split(',');
                    if (data.length === headers.length) {
                        var obj = new Object();
                        for (let j = 0; j < headers.length; j++) {
                            if (headers[j] === "leadSource") {
                                if (!this.findLeadSource(data[j])) {
                                    reqPush = false;
                                    errorList = errorList + '<br/> Invalid Lead Source in S.No. ' + obj['uniqueID'];
                                };
                            }
                            if (headers[j] === "leadType") {
                                if (!this.findLeadType(data[j])) {
                                    reqPush = false;
                                    errorList = errorList + '<br/> Invalid Lead Type in S.No. ' + obj['uniqueID'];
                                };
                            }
                            if (headers[j] === "leadContact") {
                                if (data[j] === "" || data[j].length<10) {
                                    reqPush = false;
                                    errorList = errorList + '<br/> Invalid Contact Number in S.No. ' + obj['uniqueID'];
                                };
                            }
                            if (headers[j] === "leadName") {
                                if (data[j] === "") {
                                    reqPush = false;
                                    errorList = errorList + '<br/>  Name is required in S.No. ' + obj['uniqueID'];
                                };
                            }
                            obj[headers[j]] = data[j];

                        }
                        if (reqPush) {
                            lines.push(obj);
                        }
                    }
                    else {
                        if (data[0] !== "") {
                            errorList = errorList + '<br/> Comma is not allowed in S.No. ' + data[0];
                        }
                    }
                }
                // all rows in the csv file 
                if (lines.length > 100) {
                    this.alert.error("100 Record is allowed at a time.<br/> Please reduce number of rows.", 5000);
                }
                else {
                    this.rowData = lines;
                    if (errorList.length > 0) {
                        this.alert.error(errorList, 20000);
                    }
                }
            }
            this.isLoading = false;
        }
    }

    findLeadSource(valuetofind) {
        for (let j = 0; j < this.LeadSource.length; j++) {
            if (this.LeadSource[j].value === valuetofind) {
                return true;
            }
        }
        return false;
    }

    findLeadType(valuetofind) {
        for (let j = 0; j < this.LeadSource.length; j++) {
            if (this.LeadType[j].value === valuetofind) {
                return true;
            }
        }
        return false;
    }


    deleteSelection() {
        var selectedRec = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedRec });
        if (this.gridApi.getDisplayedRowCount() <= 0) {
            this.rowData = [];
        }
    }

    saveToDB() {
        this.displayProgress = 'block';
        this.saveLead(this.gridApi.getDisplayedRowCount());
    }

    saveLead(count) {
        //return false;
        this.saveErrorList = "";
        if (this.indexNo < count) {
            this.Lead.insertCsvlead(this.gridApi.getDisplayedRowAtIndex(this.indexNo).data).subscribe(
                data => {
                    var retobj = JSON.parse(data);
                    if (retobj.leadID > 0) {
                        this.progressPer = Math.floor(((this.indexNo + 1) / count) * 100);
                    }
                    else {
                        this.saveErrorList = this.saveErrorList + '<br/> Unable to save lead name: '+retobj.leadName;
                        //this.alert.error('Error! Operation aborted', 5000);

                    }
                    this.indexNo = this.indexNo + 1;
                    this.saveLead(count);
                },
                error => {
                    this.saveErrorList = this.saveErrorList + '<br/> Unknown error while saving lead name:' + this.gridApi.getDisplayedRowAtIndex(this.indexNo).data.leadName;
                    this.progressPer = Math.floor(((this.indexNo + 1) / count) * 100);
                    this.indexNo = this.indexNo + 1;
                    this.saveLead(count);
                });
        }
        else {
            this.displayProgress = 'none';
            this.indexNo = 0;
            if (this.saveErrorList.length > 0) {
                this.alert.error(this.saveErrorList, 10000);
            } else {
                this.alert.success('Record saved successfully', 5000);
            }
            this.rowData = [];
        }
    }

    onCloseHandled() {
        this.displayProgress = 'none';
        this.displayInst = 'none';
    }
    showIns() {
        this.displayInst = 'block';
    }
} 