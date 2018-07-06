import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successMessage',
  templateUrl: './successMessage.component.html',
  styleUrls: ['./successMessage.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToLogin(){
    this.router.navigate(["/login"]);
  }

}
