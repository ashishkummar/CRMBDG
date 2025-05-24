import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    ReactiveFormsModule,
    AbstractControl,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormsModule
} from "@angular/forms";
import { ISendSms } from './ISms'
import { LeadService, AlertService } from "../../services/index";

@Component({
    selector: 'send-sms',
    templateUrl: './sendSms.component.html',
    styleUrls: ['./sendSms.component.css']
})
export class SendSmsComponent implements OnInit {
    @Input() mobileNumber: string;
    @Input() messagebody: string;
    @Output() sendSmsClick: EventEmitter<any> = new EventEmitter();;

    sendSms: FormGroup;
    Math: any;
    isLoading = false;
    public smsBal = "";
    public display = 'none';

    public sendSmsModel: ISendSms = { message: '', mobileNumber: 0 };

    constructor(
        private fb: FormBuilder
        , private Lead: LeadService
        , private alert: AlertService
    ) {
        this.Math = Math;
        this.smsBal = "";
        this.sendSms = this.fb.group({
            mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
            msg: ['', [Validators.required]]
        });
    }


    ngOnInit() {
        this.sendSms.setValue({
            mobile: this.mobileNumber,
            msg: this.messagebody
        });
    }

    onCloseHandled() {
        this.display = 'none';
    }

    sendMySms() {
        if (this.sendSms.valid) {
            this.sendSmsModel.message = this.sendSms.controls['msg'].value;
            this.sendSmsModel.mobileNumber = this.sendSms.controls['mobile'].value;
            this.sendSmsClick.emit([this.sendSmsModel]);
        }
    }

    getBalance() {
        this.isLoading = false;
        this.Lead.getSmsBalance().subscribe(data => {
            this.smsBal = data;
        }, error => {
            this.isLoading = false;
            this.alert.error(error, 5000);
        });
    }
}