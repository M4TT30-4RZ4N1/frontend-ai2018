import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionService } from './services/position/position.service';
import { MenuService} from 'ngx-admin-lte';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mobile Data Marketplace - Gruppo #5 ';
  private mylinks: any = [
    {
      'header': 'Mobile Data Marketplace'
    },
    {
      'title': 'Home',
      'icon': 'dashboard',
      'link': ['/home']
    },
    {
      'title': 'Archive',
      'icon': 'archive',
      'link': ['/archive']
    },
    {
      'title': 'Upload',
      'icon': 'upload',
      'link': ['/upload']
    },
    {
      'title': 'Buy',
      'icon': 'credit-card',
      'link': ['/buy']
    },
    {
      'title': 'Logout',
      'icon': 'power-off',
      'link': ['/logout']
    },
  ];
  constructor(private menuServ: MenuService) {}
  ngOnInit(): void {
    this.menuServ.setCurrent(this.mylinks);
  }
  
}
