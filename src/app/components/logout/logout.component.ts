import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import {Location} from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( 
    private  router: Router,
    private  location: Location, 
    private permissionsService: NgxPermissionsService, 
) { }

  ngOnInit() {

    if(confirm("Are you sure to logout?")) {
    this.permissionsService.flushPermissions();
    window.localStorage.removeItem('ai-token');
    this.router.navigate(['/login']);
    }
    else{
      this.location.back();
    }


  }

}



