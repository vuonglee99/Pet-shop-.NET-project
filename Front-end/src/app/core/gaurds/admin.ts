import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserContextService } from '../services/user-context.service';;
import {Location} from '@angular/common';

@Injectable()
export class Admin implements CanActivate {

    constructor(private router: Router, 
        private userContextService: UserContextService,
        private _location: Location) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var user = this.userContextService.user$.getValue();
        console.log(user);
        if (user != null)  {
            if (route.data.roles && (route.data.roles.indexOf(user.role) === -1)) {
                // role not authorised so redirect to home page
                //this._location.back();
                return false;
            }

            // authorised so return true
            return true;

            
        }else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        //this._location.back();
        // not logged in so redirect to login page with the return url and return false
    }
}
