import { Component } from "@angular/core";
import { DatePipe } from '@angular/common';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'params-cell',
    template: `<div style="font-size: .85em;line-height: 14px;">{{params.value}}<div style="font-size: .7em;">{{params.data.leadLastCommDt | date:'medium'}}</div></div>`
})
export class RecentQueryCellRendrer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params
    }

    refresh(): boolean {
        return false;
    }
}