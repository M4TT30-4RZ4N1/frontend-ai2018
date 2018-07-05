import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pageNotFound',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

 /*  backClicked() {
    console.log("back");
    this.location.back();
  } */
  

}
