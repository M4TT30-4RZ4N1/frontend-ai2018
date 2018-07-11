import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  changeDetectorRefs : ChangeDetectorRef[] = [];

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

  constructor(private authService : AuthService, private router : Router, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {  
    this.errorMessage = window.localStorage.getItem('error-login');
    window.localStorage.removeItem('error-login');
  }

  submit_login() {
    
    if (this.form.valid) {
     this.form.disable();
     this.disableButton = true;
     this.authService.login(this.form.controls.username.value , this.form.controls.password.value).subscribe(
        () => {}, error => { 
  
          if(error.status == 400){
            this.errorMessage = JSON.parse(error._body).error_description;
           
          }
          else{
             this.errorMessage = "Error, please try later."
          }

          this.form.enable();
          this.disableButton = false;
          this.changeDetectorRef.detectChanges();
        } 
     );
    }
}

forgotPassword(){
  this.router.navigateByUrl("/resetPassword");
}

}
