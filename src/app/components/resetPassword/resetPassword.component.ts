import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ResetService } from '../../services/auth/reset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {

  errorMessage: string | null;
  changeDetectorRefs :ChangeDetectorRef[] = [];

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
  });

  constructor(private resetService : ResetService, private changeDetectorRef:ChangeDetectorRef, private router : Router) { }

  ngOnInit() {
  }

  resetPassword(){
    if(this.form.valid){
      this.resetService.getReset(this.form.controls.username.value).subscribe((success) =>
    {
      this.router.navigateByUrl("/resetSuccess");

    }, (error) =>{
      this.errorMessage = "Operation Not Possible, Retry";
      this.changeDetectorRef.detectChanges();
    });
    }
  }

}
