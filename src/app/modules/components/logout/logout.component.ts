import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private  router: Router, private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.permissionsService.flushPermissions();
    window.localStorage.removeItem('ai-token');
    this.router.navigate(['/login']);

  }

}
