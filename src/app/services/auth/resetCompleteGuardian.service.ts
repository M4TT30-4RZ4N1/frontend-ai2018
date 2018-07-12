import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResetCompleteGuardianService implements CanActivate {

    constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let flag = window.localStorage.getItem('ai-reset-complete');

        if(flag !== null && flag !== undefined){
            window.localStorage.removeItem('ai-reset-complete');
            return true;
        }
        else{
            this.router.navigateByUrl('/login');
        }
    }


}
