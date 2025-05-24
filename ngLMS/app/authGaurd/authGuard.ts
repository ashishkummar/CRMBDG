import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router
        , private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.getUserID() != null
            && this.authenticationService.getUserID() > 0
        ) {
            // logged in so return true
            if (this.authenticationService.getUserID() == 1) {
                return true;
            }
            else {
                switch (state.url) {
                    case '/leads/leadManager':
                    case '/leads/reminders':
                    case '/leads/reminders/:userid':
                    case '/home':
                    case '/project/details':
                        return true;
                    default:
                        return false;
                }
            }
            
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}