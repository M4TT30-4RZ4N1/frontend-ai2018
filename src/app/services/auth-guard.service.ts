import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { JwtManagementService } from './jwt-management.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private  router: Router, private jwtManagementService : JwtManagementService, private permissionsService: NgxPermissionsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let token = window.localStorage.getItem('ai-token');

        let iCan = this.jwtManagementService.checkAuthTimeExpired(token);

        if (iCan === false) {
            window.localStorage.removeItem('ai-token');
            this.permissionsService.flushPermissions();
            this.router.navigate(['/login']);
        }
        console.log("debug: ican " + iCan);

        return Observable.of(iCan);
    }
    

}
