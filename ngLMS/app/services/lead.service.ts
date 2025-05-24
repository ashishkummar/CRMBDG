import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ILead, ILeadUpdate } from '../components/leadmanager/ILead'
import { AuthenticationService } from '../authGaurd/index'
import { ISendSms } from '../components/sms/ISms';

@Injectable()
export class LeadService {
    constructor(private http: Http,
        private router: Router,
        private auth: AuthenticationService
    ) { }

    getToken() {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new RequestOptions({ headers: headers });
    }

    getTokenForPDFResponce() {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.auth.getToken());
        return new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    }

    getLeadByDate(from: Date, to: Date) {

        return this.http.get('/api/Lead/GetLeadByDate?from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getLeadByCreatedDate(from: Date, to: Date) {

        return this.http.get('/api/Lead/GetLeadByCreatedDate?from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    private getDate(dt: Date): string {
        return dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
    }

    getLeadMsgByLeadID(LeadID: number) {

        return this.http.get('/api/Lead/GetLeadMsgByLeadID?leadID=' + LeadID, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    updatelead(lead: ILeadUpdate) {

        return this.http.post('/api/Lead/UpdateLead', lead, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    deleteAllMsg(lead: ILeadUpdate) {

        return this.http.post('/api/Lead/DeleteAllMsg', lead, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    insertlead(lead: ILead) {

        return this.http.post('/api/Lead/CreateLead', lead, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    updateLeadAssinee(lead: ILead[]) {

        return this.http.post('/api/Lead/UpdateLeadUser', lead, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    Deletelead(lead: ILead[]) {

        return this.http.post('/api/Lead/Deletelead', lead, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getReminderCount(uid) {

        return this.http.get('/api/Lead/GetReminderCount?uid=' + uid, this.getToken())
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.status === 200) {
                    return data.text();
                }
                else {
                    throw new Error(data.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getReminders(uid) {

        return this.http.get('/api/Lead/GetReminderForLoginUser?uid=' + uid, this.getToken())
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.status === 200) {
                    return data.text();
                }
                else {
                    throw new Error(data.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getAllReminders(uid) {

        return this.http.get('/api/Lead/GetAllReminderForLoginUser?uid=' + uid, this.getToken())
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.status === 200) {
                    return data.text();
                }
                else {
                    throw new Error(data.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getMagicLead(api: number, from: Date, to: Date) {


        return this.http.get('/api/Lead/GetLeadFromMagic?api=' + api + '&from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.status === 200) {
                    return data.text();
                }
                else {
                    throw new Error(data.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getHousingLead(from: Date, to: Date) {
        return this.http.get('/api/Lead/GetLeadFromHousing?from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.status === 200) {
                    return data.text();
                }
                else {
                    throw new Error(data.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getAcreLead(userid: string, pass: string, from: Date, to: Date) {

        return this.http.get('/api/Lead/GetLeadFromAcres?userid=' + userid + '&password=' + pass + '&from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.status === 200) {
                    return data.text();
                }
                else {
                    throw new Error(data.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    insertApilead(lead: ILead) {

        return this.http.post('/api/Lead/CreateAPILead', lead, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    insertCsvlead(lead: ILead) {

        return this.http.post('/api/Lead/CreateCSVLead', lead, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getLastFetch(source: string) {

        return this.http.get('/api/Lead/GetLastLeadFetch?source=' + source, this.getToken())
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.status === 200) {
                    return data.text();
                }
                else {
                    throw new Error(data.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getArchiveLeadByDate(from: Date, to: Date) {

        return this.http.get('/api/Lead/GetArchiveLeadByDate?from=' + this.getDate(from) + '&to=' + this.getDate(to), this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    GetArchiveLeadMsgByLeadID(LeadID: number) {

        return this.http.get('/api/Lead/GetArchiveLeadMsgByLeadID?leadID=' + LeadID, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    downloadPdf(lead: ILead) {

        return this.http.post('/api/Lead/DownloadAsPdf', lead, this.getTokenForPDFResponce())
            .map(r => r.blob())
            .catch(this.errorHandler);
    }

    sendSms(sms: ISendSms) {
        return this.http.post('/api/Lead/sendsms', sms, this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    getSmsBalance() {
        return this.http.get('/api/Lead/smsbalance', this.getToken())
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.status === 200) {
                    return user.text();
                }
                else {
                    throw new Error(user.statusText || '');
                }
            })
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        if (error.status == 401) {
            return Observable.throw("Session Expired! Please click <a href='/'>here</a> to login again.");
        }
        return Observable.throw(error.json().Message || "");
    }
}