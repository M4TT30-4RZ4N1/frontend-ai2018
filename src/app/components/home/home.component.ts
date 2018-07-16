import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { JwtManagementService } from '../../services/jwt/jwt-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Mobile Data Marketplace';
  group = 'Group #5';
  
  constructor(private permissionsService: NgxPermissionsService, private jwtManagementService:  JwtManagementService) { }

  ngOnInit() {
    const token = window.localStorage.getItem('ai-token');
    let roles = this.jwtManagementService.getJwtRoles(token);
    window.localStorage.setItem('ai-roles', roles);
    this.permissionsService.loadPermissions(roles); //ROLE_ADMIN, ROLE_USER, ROLE_CUSTOMER
    
    let element =  document.getElementsByClassName("main-footer");
    //console.dir(element);
    if(element[0] != null && element[0] != undefined){
          let e = <HTMLInputElement> element[0];
          e.hidden = true;
          e.outerHTML = "";
    }
  }

}
