import { Component, OnInit } from "@angular/core";
import { EditorModule } from 'primeng/editor';

import { SideBarService, UserService, AlertService, EmailService } from '../../services/index'
import { AuthenticationService } from '../../authGaurd/index'
import { ActivatedRoute } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
    selector: 'email-details',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})
export class EmailComponenet implements OnInit {
    isLoading = false;
    public emailIds = [];
    public selectedEmail;
    public mailBody = '';
    public mailTo: string[];
    public subject = '';
    public isValid = false;
    constructor(
        private emailService: EmailService
        , private sideBarService: SideBarService
        , private user: UserService
        , private alert: AlertService
        , private authenticationService: AuthenticationService
        , private route: ActivatedRoute

    ) {
        this.getEmailID();
    }

    getEmailID() {
        this.isLoading = true;
        this.emailService.getEmailId().subscribe(
            data => {
                this.emailIds = [];
                var id = JSON.parse(data);
                if (!id && id.length === 0) {
                    this.alert.error('No Email ID is Configured', 5000);
                    this.isValid = false;
                    this.isLoading = false;
                    return;
                }
                for (var i = 0; i < id.length; i++) {
                    if (id[i].EmailId ==='') {
                        this.alert.error('From Email id is not configured properly<br/> This feature is disabled', 5000);
                        this.isValid = false;
                        this.isLoading = false;
                        return;
                    }
                    this.emailIds.push({ label: id[i].EmailId, value: id[i].EmailId });
                    if (i === 0) {
                        this.selectedEmail = { label: id[i].EmailId, value: id[i].EmailId };
                    }
                }
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.alert.error(error, 5000);
            });
    }

    ngOnInit() {
        this.sideBarService.setPageTitle('E-Mailer');
    }
    sendMail() {

    }
}

