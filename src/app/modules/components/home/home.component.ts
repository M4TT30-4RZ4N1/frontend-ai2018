import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { JwtManagementService } from '../../../services/jwt-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private permissionsService: NgxPermissionsService, private jwtManagementService:  JwtManagementService) { }

  ngOnInit() {
    const token = window.localStorage.getItem('ai-token');
    let roles = this.jwtManagementService.getJwtRoles(token);
    this.permissionsService.loadPermissions(roles); //ROLE_ADMIN, ROLE_USER, ROLE_CUSTOMER
  }

}
