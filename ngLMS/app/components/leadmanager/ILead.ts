import { StaticSymbolResolverHost } from "@angular/compiler";

export interface ILead {
    leadID: number;
    leadName: string;
    leadContact: string;
    leadEmail: string;
    leadSource: string;
    leadType: string;
    leadQuery: string;
    leadLastComm: string;
    leadLastCommDt: Date;
    status: IStatus;
    leadAssignee: string;
    leadEntryDate: Date;
    lastUpdatedOn: Date;
    lastComBy: string,
    uid: number;
    recentQuery: string,
    reminderDate: Date;
}

export interface IStatus {
    id: number;
    value: string;
}

export interface ILeadUpdate {
    LeadID: number;
    Status: number;
    ReminderOn: Date;
    AssignID: number;
    Message: string
    PostedBy: number;
}