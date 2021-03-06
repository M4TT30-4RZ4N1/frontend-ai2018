import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { CheckDuplicateUsernameService } from '../../services/auth/checkDuplicateUsername.service';
import { Observable } from 'rxjs';
import { RegisterService } from '../../services/auth/register.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  
  changeDetectorRefs :ChangeDetectorRef[] = [];
  public user: User;
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(
    private router : Router,
    private checkDuplicateUsernameService: CheckDuplicateUsernameService,
    private registerService:RegisterService,
    private changeDetectorRef:ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if(this.subscription !== null && this.subscription !== undefined){
       this.subscription.unsubscribe();
    }
  }

  @Input() errorMessage: string | null;

   registrationForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required],this.validateUsernameNotTaken.bind(this)),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  },  this.passwordMatchValidator); 

  validateUsernameNotTaken(control: AbstractControl) {
    return Observable.timer(500).switchMap(()=>{
      return this.checkDuplicateUsernameService.check(control.value)
        .mapTo(null)
        .catch(err=>Observable.of({usernameTaken: true}));
    });
  }

 passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value
       ? null : {'mismatch': true};
 }

  submit_registration() {
    /**console.log("Registration parameters inserted:"
      + this.registrationForm.controls.username.value + " | "
      + this.registrationForm.controls.password.value + " | "
      + this.registrationForm.controls.confirmpassword.value + " | ");
      **/

      this.user =
      new User(
        this.registrationForm.controls.email.value,
        this.registrationForm.controls.username.value,
        this.registrationForm.controls.password.value);

        //console.log(this.user);

    if (this.registrationForm.valid) {
      this.subscription = this.registerService.register(this.user).subscribe((data) => {
        if (!data) {
          this.errorMessage = "Registration Error";
          this.changeDetectorRef.detectChanges();
        }
        else{
          this.errorMessage = null;
          window.localStorage.setItem('ai-registration', 'pending');
          this.router.navigateByUrl('registrationSuccess');
        }
      });
    }

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

