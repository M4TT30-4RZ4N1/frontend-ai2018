import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { JwtManagementService } from '../jwt/jwt-management.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class NoAuthGuardService implements CanActivate {

    constructor(private  router: Router, private jwtManagementService : JwtManagementService, private permissionsService: NgxPermissionsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let token = window.localStorage.getItem('ai-token');

        let iCan = this.jwtManagementService.checkAuthTimeExpired(token);

        // reverse guardian of authentication
        if (iCan === false) {
            iCan = true;
        }
        else{
            iCan = false;
        }

        return Observable.of(iCan);
    }
    

}

