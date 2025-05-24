import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AgGridModule } from "ag-grid-angular/main";

import { CalendarModule } from 'primeng/calendar';
import { GrowlModule } from 'primeng/growl';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/components/common/messageservice';
import { ProgressBarModule } from 'primeng/progressbar'
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChartModule } from 'primeng/chart';
import { ScheduleModule } from 'primeng/schedule';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';

import {
    AlertComponent
    , AppComponent
    , NavMenuComponent
    , HeadBarComponent
    , CreateUserComponent
    , PageNavComponent
    , LoginComponent
    , LoaderComponent
    , LeadManagerComponent
    , RecentQueryCellRendrer
    , communicationCellRendrer
    , entryDateCellRendrer
    , CreateLeadComponent
    , ReminderDetailsComponent
    , MagicComponent
    , AcreComponent
    , HousingComponent
    , PrivilageCustomer
    , CreateCustomerComponent
    , ProjectComponent
    , CreateProjectComponent
    , ArchiveComponent
    , EmailComponenet
    , BulkEmailComponenet
    , SendSmsComponent
    , CsvComponent
} from './components/index';

import {
    SafeHtmlPipe
} from './pipes/index';

import { SideBarService, UserService, AlertService, LeadService, PrivCustomer, ProjectService, EmailService } from './services/index';

import { AuthGuard, AuthenticationService } from './authGaurd/index';

@NgModule({
    declarations: [
        SafeHtmlPipe,
        AppComponent,
        NavMenuComponent,
        HeadBarComponent,
        CreateUserComponent,
        PageNavComponent,
        LoginComponent,
        LoaderComponent,
        AlertComponent,
        LeadManagerComponent,
        RecentQueryCellRendrer,
        communicationCellRendrer,
        entryDateCellRendrer,
        CreateLeadComponent,
        ReminderDetailsComponent,
        MagicComponent,
        AcreComponent,
        HousingComponent,
        PrivilageCustomer,
        CreateCustomerComponent,
        ProjectComponent,
        CreateProjectComponent,
        ArchiveComponent,
        EmailComponenet,
        BulkEmailComponenet,
        SendSmsComponent,
        CsvComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CalendarModule,
        GrowlModule,
        MessagesModule,
        SidebarModule,
        ProgressBarModule,
        InputSwitchModule,
        ChartModule,
        ScheduleModule,
        ConfirmDialogModule,
        FileUploadModule,
        EditorModule,
        DropdownModule,
        ChipsModule,
        InputTextModule,
        AgGridModule.withComponents([RecentQueryCellRendrer
            , communicationCellRendrer
            , entryDateCellRendrer]
        ),
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            {
                path: 'leads', component: NavMenuComponent, children: [
                    { path: 'leadManager', component: LeadManagerComponent, canActivate: [AuthGuard] },
                    { path: 'reminders', component: ReminderDetailsComponent, canActivate: [AuthGuard] },
                    { path: 'reminders/:userid', component: ReminderDetailsComponent }
                ] },
            {
                path: 'home', component: NavMenuComponent, children: [
                    { path: 'createUser', component: CreateUserComponent, canActivate: [AuthGuard] },
                    { path: 'magicbricks', component: MagicComponent, canActivate: [AuthGuard] },
                    { path: '99acre', component: AcreComponent, canActivate: [AuthGuard] },
                    { path: 'csv', component: CsvComponent, canActivate: [AuthGuard] },
                    { path: 'housing', component: HousingComponent, canActivate: [AuthGuard] },
                ], canActivate: [AuthGuard]
            },
            {
                path: 'project', component: NavMenuComponent, children: [
                    { path: 'details', component: ProjectComponent, canActivate: [AuthGuard] }
                ], canActivate: [AuthGuard]
            },
            {
                path: 'customer', component: NavMenuComponent, children: [
                    { path: 'privilage', component: PrivilageCustomer, canActivate: [AuthGuard] }
                ], canActivate: [AuthGuard]
            },
            {
                path: 'email', component: NavMenuComponent, children: [
                    { path: 'single', component: EmailComponenet },
                    { path: 'bulk', component: BulkEmailComponenet }
                ]
            },
            {
                path: 'archive', component: NavMenuComponent, children: [
                    { path: 'lead', component: ArchiveComponent, canActivate: [AuthGuard] }
                ], canActivate: [AuthGuard]
            },
            { path: '**', redirectTo: 'login' }
        ])
    ],
    providers: [
        SideBarService,
        UserService,
        AuthenticationService,
        AuthGuard,
        AlertService,
        LeadService,
        ProjectService,
        PrivCustomer,
        MessageService,
        ConfirmationService,
        ProgressBarModule,
        EmailService
    ]
})
export class AppModuleShared {
}
