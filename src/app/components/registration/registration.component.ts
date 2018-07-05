import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User;

  public captchaResult: string | null;
  public captchaSolved: boolean;

  constructor() { }

  ngOnInit() {
  }

  @Input() errorMessage: string | null;

  // @Input()
  // set pending(isPending: boolean) {
  //   if (isPending) {
  //     this.registrationForm.disable();
  //   } else {
  //     this.registrationForm.enable();
  //   }
  // }
  registrationForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl('')
  });

  submit_registration() {
    console.log("Registration parameters inserted:"
      + this.registrationForm.controls.username.value + " | "
      + this.registrationForm.controls.password.value + " | "
      + this.registrationForm.controls.confirmpassword.value + " | "
      + this.captchaResult);

      this.user = 
      new User(
        this.registrationForm.controls.username.value,
        this.registrationForm.controls.password.value);

        console.log(this.user);

    /*  if (this.form.valid) {
this.submitted.emit(this.form.value);
} */
  }

  showHide() {
    var element1 = <HTMLInputElement> document.getElementById("pwd");
    var element2 = <HTMLInputElement> document.getElementById("confirmpwd");
    
    if (element1.type === "password" && element2.type === "password") {
      element1.type = "text";
      element2.type = "text";
    } else {
      element1.type = "password";
      element2.type = "password";
    }
} 



}
