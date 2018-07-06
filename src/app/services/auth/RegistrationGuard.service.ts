import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationGuardService implements CanActivate  {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
       
        let pending = window.localStorage.getItem('ai-registration');

        if(pending !== null && pending !== undefined){
            window.localStorage.removeItem('ai-registration');
            return true;
        }
        else{
            this.router.navigateByUrl('/login');
        }
    }


}
