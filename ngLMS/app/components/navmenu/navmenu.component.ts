import { Component,OnInit } from '@angular/core';
import { SideBarService } from '../../services/navbar.service'
import { AuthenticationService } from '../../authGaurd/index'

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {

    public colapsePanel: boolean = true;
    public isAdm: boolean = false;

    constructor(private sideBarService: SideBarService
        , private auth: AuthenticationService
    ) {

    }

    ngOnInit() {
        this.isAdm = this.auth.getUserRole();
        this.sideBarService.change.subscribe((isOpen: boolean) => { this.colapsePanel = isOpen; });
    }
}
