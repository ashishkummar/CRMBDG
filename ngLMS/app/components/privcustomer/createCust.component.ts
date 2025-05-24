import {
    Component, Input, OnInit, Output, EventEmitter
} from '@angular/core';
import {
    ReactiveFormsModule,
    AbstractControl,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormsModule
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Message } from 'primeng/api';

import { SideBarService, UserService, AlertService, PrivCustomer } from '../../services/index'

import { AuthenticationService } from '../../authGaurd/index'
import { IPrivCust } from './IPrivCust';

@Component({
    selector: 'create-customer',
    templateUrl: './createCust.component.html',
    styleUrls: ['./createCust.component.css']
})

export class CreateCustomerComponent implements OnInit {

    @Output() onSaveClick: EventEmitter<any> = new EventEmitter();
    @Input() customerData: IPrivCust;

    popMsg: Message[] = [];
    isLoading = false;
    public display = 'none';
    createLead: FormGroup;

    selectedLead: IPrivCust = {
        ID: 0,
        CustomerName: '',
        Address: '',
        anniversaryDt: new Date(),
        BookingDt: new Date(),
        DOB: new Date(),
        MobileNo: '',
        Number: '',
        Product: '',
        UnitID: ''
    }
          


    constructor(
        private Lead: PrivCustomer
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
        , private fb: FormBuilder
    ) {

        this.createLead = this.fb.group({
            ID:0,
            name: ['', [Validators.required, Validators.maxLength(25)]],
            email: '',
            address: '',
            anniversary: '',
            Booking: '',
            DOB: '',
            contact: '',
            product: '',
            unitid: ''
           

        });

    }
    ngOnInit() {
        this.createLead.setValue({
            ID: this.customerData.ID,
            name: this.customerData.CustomerName,
            email: this.customerData.Number,
            address: this.customerData.Address,
            anniversary: this.customerData.anniversaryDt,
            Booking: this.customerData.BookingDt,
            DOB: this.customerData.DOB,
            contact: this.customerData.MobileNo,
            product: this.customerData.Product,
            unitid: this.customerData.UnitID

        });
    }

    onCloseHandled() {
        this.display = 'none';
    }

    insertLead() {
        if (this.createLead.valid) {
            this.customerData.ID = this.createLead.controls['ID'].value;
            this.customerData.CustomerName = this.createLead.controls['name'].value;
            this.customerData.Number = this.createLead.controls['email'].value;
            this.customerData.Address = this.createLead.controls['address'].value;
            this.customerData.anniversaryDt = this.createLead.controls['anniversary'].value;
            this.customerData.BookingDt = this.createLead.controls['Booking'].value;
            this.customerData.DOB = this.createLead.controls['DOB'].value;
            this.customerData.MobileNo = this.createLead.controls['contact'].value;
            this.customerData.Product = this.createLead.controls['product'].value;
            this.customerData.UnitID = this.createLead.controls['unitid'].value;
            this.onSaveClick.emit([this.customerData]);
        }
    }


} 