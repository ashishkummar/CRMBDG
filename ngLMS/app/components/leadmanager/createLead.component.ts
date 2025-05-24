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

import { SideBarService, UserService, AlertService, LeadService } from '../../services/index'

import { AuthenticationService } from '../../authGaurd/index'
import { ILead } from './ILead';
import { DropDownHelper } from './LeadConfig';

@Component({
    selector: 'create-lead',
    templateUrl: './createLead.component.html',
    styleUrls: ['./createLead.component.css']
})

export class CreateLeadComponent implements OnInit {

    @Output() onSaveClick: EventEmitter<any> = new EventEmitter();

    popMsg: Message[] = [];
    isLoading = false;
    public display = 'none';
    createLead: FormGroup;
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

    sources = [];

    type = [];


    constructor(
        private Lead: LeadService
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
        , private fb: FormBuilder
    ) {
        this.dropDownHelper = new DropDownHelper();
        this.sources = this.dropDownHelper.getLeadSource();

        this.type = this.dropDownHelper.getLeadType();


        this.createLead = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(25)]],
            email: ['', [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")
            ]],
            createdOn: ['', [Validators.required]],
            Source: ['', [Validators.required]],
            Type: ['', [Validators.required]],
            query: ['', [Validators.required]],
            contact: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(13)]]

        });

    }
    ngOnInit() {

    }

    onCloseHandled() {
        this.display = 'none';
    }

    insertLead() {
        if (this.createLead.valid) {
            this.selectedLead.leadID = 0;
            this.selectedLead.leadName = this.createLead.controls['name'].value;
            this.selectedLead.leadEmail = this.createLead.controls['email'].value;
            this.selectedLead.leadSource = this.createLead.controls['Source'].value;
            this.selectedLead.leadType = this.createLead.controls['Type'].value;
            this.selectedLead.leadEntryDate = this.createLead.controls['createdOn'].value;
            this.selectedLead.leadQuery = this.createLead.controls['query'].value;
            this.selectedLead.leadContact = this.createLead.controls['contact'].value;
            this.selectedLead.uid = this.authenticationService.getUserID();
            this.onSaveClick.emit([this.selectedLead]);
        }
    }


} 