import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { JwtManagementService } from '../jwt/jwt-management.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService,User } from 'ngx-admin-lte';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private  router: Router, private jwtManagementService : JwtManagementService, private permissionsService: NgxPermissionsService,private userServ: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let token = window.localStorage.getItem('ai-token');

        // load permission -- FIX BUG RELOAD
        let roles = this.jwtManagementService.getJwtRoles(token);
        window.localStorage.setItem('ai-roles', roles);
        this.permissionsService.loadPermissions(roles);

        let iCan = this.jwtManagementService.checkAuthTimeExpired(token);

        if (iCan === false) {
            window.localStorage.removeItem('ai-token');
            this.permissionsService.flushPermissions();
            this.router.navigate(['/login']);
        }else{
            let username= this.jwtManagementService.getJwtUsername(token);
            const user1 = new User( {
                avatarUrl: 'assets/img/user2-160x160.jpg',
                firstname: username,
                lastname: ''
            } );
    
            user1.connected = true;
    
            this.userServ.setCurrent( user1 );
            this.userServ.logoutAction=()=>{
                const user = new User();
                user.connected = false;
                this.userServ.setCurrent( user );
                this.permissionsService.flushPermissions();
                window.localStorage.removeItem('ai-token');
                window.localStorage.removeItem('ai-roles');
                this.router.navigate(['/login']);
            };
        }
        //console.log("debug: ican " + iCan);

        return Observable.of(iCan);
    }
    

}
