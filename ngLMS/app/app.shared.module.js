"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
var main_1 = require("ag-grid-angular/main");
var calendar_1 = require("primeng/calendar");
var growl_1 = require("primeng/growl");
var messages_1 = require("primeng/messages");
var messageservice_1 = require("primeng/components/common/messageservice");
var progressbar_1 = require("primeng/progressbar");
var sidebar_1 = require("primeng/sidebar");
var inputswitch_1 = require("primeng/inputswitch");
var chart_1 = require("primeng/chart");
var schedule_1 = require("primeng/schedule");
var confirmdialog_1 = require("primeng/confirmdialog");
var api_1 = require("primeng/api");
var fileupload_1 = require("primeng/fileupload");
var index_1 = require("./components/index");
var index_2 = require("./pipes/index");
var index_3 = require("./services/index");
var index_4 = require("./authGaurd/index");
var AppModuleShared = /** @class */ (function () {
    function AppModuleShared() {
    }
    AppModuleShared = __decorate([
        core_1.NgModule({
            declarations: [
                index_2.SafeHtmlPipe,
                index_1.AppComponent,
                index_1.NavMenuComponent,
                index_1.HeadBarComponent,
                index_1.CreateUserComponent,
                index_1.PageNavComponent,
                index_1.LoginComponent,
                index_1.LoaderComponent,
                index_1.AlertComponent,
                index_1.LeadManagerComponent,
                index_1.RecentQueryCellRendrer,
                index_1.communicationCellRendrer,
                index_1.entryDateCellRendrer,
                index_1.CreateLeadComponent,
                index_1.ReminderDetailsComponent,
                index_1.MagicComponent,
                index_1.AcreComponent,
                index_1.HousingComponent,
                index_1.PrivilageCustomer,
                index_1.CreateCustomerComponent,
                index_1.ProjectComponent,
                index_1.CreateProjectComponent,
                index_1.ArchiveComponent
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                calendar_1.CalendarModule,
                growl_1.GrowlModule,
                messages_1.MessagesModule,
                sidebar_1.SidebarModule,
                progressbar_1.ProgressBarModule,
                inputswitch_1.InputSwitchModule,
                chart_1.ChartModule,
                schedule_1.ScheduleModule,
                confirmdialog_1.ConfirmDialogModule,
                fileupload_1.FileUploadModule,
                main_1.AgGridModule.withComponents([index_1.RecentQueryCellRendrer,
                    index_1.communicationCellRendrer,
                    index_1.entryDateCellRendrer]),
                router_1.RouterModule.forRoot([
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    { path: 'login', component: index_1.LoginComponent },
                    {
                        path: 'leads', component: index_1.NavMenuComponent, children: [
                            { path: 'leadManager', component: index_1.LeadManagerComponent, canActivate: [index_4.AuthGuard] },
                            { path: 'reminders', component: index_1.ReminderDetailsComponent, canActivate: [index_4.AuthGuard] },
                            { path: 'reminders/:userid', component: index_1.ReminderDetailsComponent }
                        ]
                    },
                    {
                        path: 'home', component: index_1.NavMenuComponent, children: [
                            { path: 'createUser', component: index_1.CreateUserComponent, canActivate: [index_4.AuthGuard] },
                            { path: 'magicbricks', component: index_1.MagicComponent, canActivate: [index_4.AuthGuard] },
                            { path: '99acre', component: index_1.AcreComponent, canActivate: [index_4.AuthGuard] },
                            { path: 'housing', component: index_1.HousingComponent, canActivate: [index_4.AuthGuard] },
                        ], canActivate: [index_4.AuthGuard]
                    },
                    {
                        path: 'project', component: index_1.NavMenuComponent, children: [
                            { path: 'details', component: index_1.ProjectComponent, canActivate: [index_4.AuthGuard] }
                        ], canActivate: [index_4.AuthGuard]
                    },
                    {
                        path: 'customer', component: index_1.NavMenuComponent, children: [
                            { path: 'privilage', component: index_1.PrivilageCustomer, canActivate: [index_4.AuthGuard] }
                        ], canActivate: [index_4.AuthGuard]
                    },
                    {
                        path: 'archive', component: index_1.NavMenuComponent, children: [
                            { path: 'lead', component: index_1.ArchiveComponent, canActivate: [index_4.AuthGuard] }
                        ], canActivate: [index_4.AuthGuard]
                    },
                    { path: '**', redirectTo: 'login' }
                ])
            ],
            providers: [
                index_3.SideBarService,
                index_3.UserService,
                index_4.AuthenticationService,
                index_4.AuthGuard,
                index_3.AlertService,
                index_3.LeadService,
                index_3.ProjectService,
                index_3.PrivCustomer,
                messageservice_1.MessageService,
                api_1.ConfirmationService,
                progressbar_1.ProgressBarModule
            ]
        })
    ], AppModuleShared);
    return AppModuleShared;
}());
exports.AppModuleShared = AppModuleShared;
