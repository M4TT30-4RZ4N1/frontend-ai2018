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
 
  public selectedMoments = [
    new Date(2018, 1, 12, 10, 30),
    new Date(2018, 3, 21, 20, 30)
];

  constructor(private positionService: PositionService){}
  ngOnInit(): void {
   
  }
  
  public recoverPositions(){
    console.log("working " + this.selectedMoments );
    this.positionService.debug();
    this.positionService.getPositions();
  }
  
  
}
