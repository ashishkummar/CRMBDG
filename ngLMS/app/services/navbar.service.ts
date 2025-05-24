import { Injectable,Output,EventEmitter } from "@angular/core";


@Injectable()
export class SideBarService {

    isOpen: boolean = true;

    @Output() change: EventEmitter<boolean> = new EventEmitter();
    @Output() pageTitle: EventEmitter<string> = new EventEmitter();
    @Output() UpdateReminderCount: EventEmitter<number> = new EventEmitter();

    toggle() {
        this.isOpen = !this.isOpen;
        this.change.emit(this.isOpen);
    }

    collapsPanel() {
        this.isOpen = true;
        this.change.emit(true);
    }

    ExpandPanel() {
        this.isOpen = false;
        this.change.emit(false);
    }

    setPageTitle(title: string) {
        this.pageTitle.emit(title);
    }

    updateReminderCount(uid) {
        this.UpdateReminderCount.emit(uid);
    }
}