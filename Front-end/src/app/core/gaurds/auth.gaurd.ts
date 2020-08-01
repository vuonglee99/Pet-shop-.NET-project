import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserContextService } from '../services/user-context.service';;

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userContextService: UserContextService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var user = this.userContextService.user$.getValue();
        if (user != null)  {
            return true;
            
        }
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        

        
    }
}
