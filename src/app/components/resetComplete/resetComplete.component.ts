import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetComplete',
  templateUrl: './resetComplete.component.html',
  styleUrls: ['./resetComplete.component.scss']
})
export class ResetCompleteComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  redirectToLogin(){
    this.router.navigate(["/login"]);
  }

}
