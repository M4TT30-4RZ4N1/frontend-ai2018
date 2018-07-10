import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  disableButton : boolean = false;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  errorMessage: string | null;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {  
    this.errorMessage = window.localStorage.getItem('error-login');
    window.localStorage.removeItem('error-login');
  }

  submit_login() {
    
    if (this.form.valid) {
     this.form.disable();
     this.disableButton = true;
     this.authService.login(this.form.controls.username.value , this.form.controls.password.value);
    }
}

forgotPassword(){
  this.router.navigateByUrl("/resetPassword");
}

}
