import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SideBarService, LeadService, AlertService, UserService } from '../../services/index';
import { AuthenticationService } from '../../authGaurd/index';
import { ILead } from '../leadmanager/ILead';
import { SidebarModule } from 'primeng/sidebar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
@Component({
    selector: 'page-bar',
    templateUrl: './pageNav.component.html',
    styleUrls: ['./pageNav.component.css']
})
export class PageNavComponent implements OnInit {
    pagetitle: string = '';
    ReminderCount: number = 0;
    appUser: string = '';
    reminder: ILead[];
    showReminderMsg = false;
    public remMsg = [];
    public isLoading = false;
    public resetPasswordMdl = 'none';
    uid;
    public oldPass = '';
    public newPass = '';
    public newReenter = '';
    constructor(private sideBarService: SideBarService
        , private auth: AuthenticationService
        , private Lead: LeadService
        , private alert: AlertService
        , private userServie: UserService
    ) {
        this.getReminderForUser(auth.getUserID());
        this.uid = auth.getUserID();
    }

    getReminderForUser(uid) {
        this.Lead.getReminders(uid).subscribe(
            data => {
                this.reminder = JSON.parse(data);
                this.startTimer();
                
            },
            error => {
               
            });
        this.Lead.getReminderCount(uid).subscribe(
            data => {
                this.ReminderCount =data;
            },
            error => {

            });

    }


    updateReminderCount(uid) {
        this.Lead.getReminderCount(uid).subscribe(
            data => {
                this.ReminderCount = data;
            },
            error => {
            });

    }

    ngOnInit() {
        this.sideBarService.pageTitle.subscribe((isOpen: string) => { this.pagetitle = isOpen; });
        this.sideBarService.UpdateReminderCount.subscribe((uid: number) => { this.getReminderForUser(uid); this.uid = uid; });
        this.appUser = this.auth.getUserName();
    }

    toggleclick() {
        this.sideBarService.toggle();
    }

    logout() {
        this.auth.logout();
    }

    ReminderClicked() {
        this.auth.navigateToUrlWithParam('/leads/reminders', this.uid)
    }

    startTimer() {
        if (this.ReminderCount > 0) {
            Observable.interval(120000)
                .subscribe(i => {
                    this.remMsg = [];
                    for (let rem of this.reminder) {
                        if (new Date(rem.reminderDate) > new Date() && new Date(rem.reminderDate) <= new Date(new Date().getTime() + 5 * 60000)) {
                            this.remMsg.push(rem);
                        }
                    }
                    if (this.remMsg.length >0) {
                        this.showReminderMsg = true;
                    }
                });
        }
    }

    remiderClosed() {
        this.remMsg = [];
        this.showReminderMsg = false;
    }

    showResetPass() {
        this.oldPass = '';
        this.newReenter = '';
        this.newPass = '';
        this.resetPasswordMdl = 'block';
    }

    onCloseHandled() {
        this.resetPasswordMdl = 'none';
    }

    changePassword() {
        if (this.oldPass === '') {
            this.alert.error('Enter Current login Password', 5000);
            return;
        }
        if (this.newPass === '') {
            this.alert.error('Enter New login Password', 5000);
            return;
        }
        if (this.newReenter === '') {
            this.alert.error('Reenter Password is required', 5000);
            return;
        }
        if (this.newPass != this.newReenter) {
            this.alert.error('New password is not matching with re-enter Password', 5000);
            return;
        }
        if (this.newPass.length < 4) {
            this.alert.error('Password length should be minimun of 4 character', 5000);
            return;
        }

        var data = new Object();
        data["id"] = this.auth.getUserID();
        data["oldpass"] = this.oldPass;
        data["newpass"] = this.newPass;
        this.isLoading = true;
        this.userServie.updatePass(data).subscribe(data => {
            if (data === 'true') {
                this.alert.success('Password reset successfully', 5000);
            }
            this.onCloseHandled();
            this.isLoading = false;
        },
        error => {
            this.alert.error(error, 5000);
            this.isLoading = false;
        })
    }
}