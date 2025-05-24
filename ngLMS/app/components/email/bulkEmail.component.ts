import { Component, OnInit } from "@angular/core";
import { EditorModule } from 'primeng/editor';

import { SideBarService, UserService, AlertService, EmailService } from '../../services/index'
import { AuthenticationService } from '../../authGaurd/index'
import { ActivatedRoute } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
    selector: 'bulkEmail-details',
    templateUrl: './bulkEmail.component.html',
    styleUrls: ['./bulkEmail.component.css']
})
export class BulkEmailComponenet implements OnInit {
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
    }

    ngOnInit() {
        this.sideBarService.setPageTitle('Bulk Mailer');
    }
    sendMail() {

    }
}

