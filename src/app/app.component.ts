import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionService } from './services/position.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Laboratorio 4 - Gruppo #5 ';
 
  constructor(){}
  ngOnInit(): void {
   
  }
  
}
