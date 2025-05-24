import { Component } from "@angular/core";
import { DatePipe } from '@angular/common';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'entry-cell',
    template: `<div style="font-size: .8em;">{{params.value | date:'medium'}}</div>`
})
export class entryDateCellRendrer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params
    }

    refresh(): boolean {
        return false;
    }
}