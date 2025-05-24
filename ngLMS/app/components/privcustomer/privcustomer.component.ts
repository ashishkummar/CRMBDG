import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GridOptions } from "ag-grid/main";
import { CalendarModule } from 'primeng/calendar';
import { Message } from 'primeng/api';


import { RecentQueryCellRendrer, communicationCellRendrer, entryDateCellRendrer } from "../index"

import { SideBarService, UserService, AlertService, PrivCustomer } from '../../services/index'

import { AuthenticationService } from '../../authGaurd/index'
import { IPrivCust } from './IPrivCust';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Logger } from 'ag-grid/dist/lib/logger';


@Component({
    selector: 'priv-cust',
    templateUrl: './privcustomer.component.html',
    styleUrls: ['./privcustomer.component.css']
})

export class PrivilageCustomer implements OnInit {

    public gridOptions: GridOptions;
    public gridApi;
    public rowData: any[];
    public columnDefs: any[];
    popMsg: Message[] = [];
    isLoading = false;
    public frameworkComponents: any;
    public getRowHeight: any
    public display = 'none';
    public isAdmin: boolean = false;
    currentUserID: number = 0;
    getRowNodeId;
    public rowSelection = 'single';

    selectedRec: IPrivCust = {
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
    }
    
    constructor(
        private Lead: PrivCustomer
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService


    ) {

       
        this.isAdmin = authenticationService.getUserRole();
        if (this.isAdmin) {
       //     this.rowSelection = "multiple";
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
                headerName: "ID", field: "ID", width: 100
                , checkboxSelection: this.isAdmin
                , headerCheckboxSelection: this.isAdmin
                , headerCheckboxSelectionFilteredOnly: this.isAdmin
            },
            { headerName: "Name", field: "CustomerName" },
            { headerName: "Mobile No", field: "MobileNo" },
            { headerName: "Email", field: "Number" },
            {
                headerName: "Brith Day", field: "DOB", filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        if (dateAsString == null) return -1;
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
                        if (dateAsString == null) return -1;
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
                headerName: "Address", field: "Address", tooltip: function (params: any) {
                    return params.value;
                }, width: 350, cellRenderer: "recentQuerycellRendrer"
            },
            {
                headerName: "Booking Date", field: "BookingDt", filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        if (dateAsString == null) return -1;
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
                headerName: "Product", field: "Product", tooltip: function (params: any) {
                    return params.value;
                }
            },
            { headerName: "Unit ID", field: "UnitID" }
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
            return data.ID;
        };

        this.LoadPrevCustomer();
    }

    LoadPrevCustomer() {
        this.isLoading = true;
        this.Lead.getAllRecord().subscribe(
            data => {
                this.rowData = JSON.parse(data);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });

    }

    createCustomer() {
        this.resetSelectedRecord();
        this.display = 'block';
    }
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

    ngOnInit() {
        this.sideBarService.setPageTitle('Privilege Customer');
    }

    openModal(params: any) {
        this.display = 'block';
        this.selectedRec = params.data;
    }

    onCloseHandled() {
        this.display = 'none';
    }

    resetSelectedRecord() {
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
    }

    onFilterTextBoxChanged(val: string) {
        this.gridApi.setQuickFilter(val);
    }

    //changeRemData(evn) {
    //    if (evn.checked) {
    //        this.LoadReminderForUser();
    //    }
    //    else {
    //        this.LoadAllReminderForUser();
    //    }
    //}

    saveCustomer(data: IPrivCust) {
        this.isLoading = true;
        this.Lead.insUpdtRecord(data).subscribe(
            dt => {
                if (data.ID > 0) {
                    this.gridApi.updateRowData({
                        update: [JSON.parse(dt)]
                    });
                    this.alert.success("Record Updated successfully", 5000);
                }
                else {
                    this.gridApi.updateRowData({
                        add: [JSON.parse(dt)],
                        addIndex: 0
                    });
                    this.alert.success("Record inserted successfully", 5000);
                }
                this.isLoading = false;
                this.onCloseHandled();
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            }); 
    }

    DeleteCustomer() {
        
        let selecteditem = this.gridApi.getSelectedRows();
        if (selecteditem.length <= 0) {
            this.alert.error("Please select a record to delete", 5000);
            return;
        }
        this.isLoading = true;
        this.Lead.deleteRecord(selecteditem[0]).subscribe(
            dt => {
                if (dt === "true") {
                    this.gridApi.updateRowData({
                        remove: selecteditem
                    });
                    this.alert.success("Record deleted successfully", 5000);
                }
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }
} 