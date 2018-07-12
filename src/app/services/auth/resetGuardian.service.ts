import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResetGuardianService implements CanActivate {

    constructor(private router : Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let flag = window.localStorage.getItem('ai-reset');

        if(flag !== null && flag !== undefined){
            window.localStorage.removeItem('ai-reset');
            return true;
        }
        else{
            this.router.navigateByUrl('/login');
        }
    }



}
