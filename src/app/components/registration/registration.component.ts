import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { CheckDuplicateUsernameService } from '../../services/auth/checkDuplicateUsername.service';
import { Observable } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User;

  public captchaResult: string | null;
  public captchaSolved: boolean;

  constructor(private checkDuplicateUsernameService: CheckDuplicateUsernameService) {
  }

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
    username: new FormControl('',[Validators.required],this.validateUsernameNotTaken.bind(this)),
    password: new FormControl(''),
    confirmpassword: new FormControl('')
  });
  validateUsernameNotTaken(control: AbstractControl) {
    return Observable.timer(500).switchMap(()=>{
      return this.checkDuplicateUsernameService.check(control.value)
        .mapTo(null)
        .catch(err=>Observable.of({usernameTaken: true}));
    });
  }
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
