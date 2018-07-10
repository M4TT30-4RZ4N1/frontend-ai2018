import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResetService } from '../../services/auth/reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  username : string | null;
  code : string | null;
  errorMessage : string | null;
  changeDetectorRefs : ChangeDetectorRef[] = [];
  
  resetForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  },  this.passwordMatchValidator); 
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resetService : ResetService,
    private changeDetectorRef:ChangeDetectorRef,
  ) { }

  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get('id');
    let parameters = id.split('@');

    //check parameter == 2 // else error
    let l = parameters.length;

    if(l == 2){
      this.username = parameters[0];
      this.code = parameters[1];
      //console.log(this.username + " " + this.code);
    }
    else{
      console.log("not formatted like: username@code");
      this.router.navigateByUrl("/login");
    }

  }

  reset(){
     this.resetService.postReset(this.username,this.code, this.resetForm.controls.password.value)
     .subscribe((success) => {
        this.router.navigateByUrl("/resetComplete");
     }, (error) =>
    {
      this.errorMessage = "An error occured, please retry!"
      this.changeDetectorRef.detectChanges();
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value
       ? null : {'mismatch': true};
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
