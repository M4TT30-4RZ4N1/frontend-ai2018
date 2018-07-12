import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ResetService } from '../../services/auth/reset.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  errorMessage: string | null;
  changeDetectorRefs :ChangeDetectorRef[] = [];

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
  });

  constructor(private resetService : ResetService, private changeDetectorRef:ChangeDetectorRef, private router : Router) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if(this.subscription !== null && this.subscription !== undefined){
      this.subscription.unsubscribe();
    }
  }

  resetPassword(){
    if(this.form.valid){
      this.subscription = this.resetService.getReset(this.form.controls.username.value).subscribe((success) =>
    {
      window.localStorage.setItem('ai-reset','pending');
      this.router.navigateByUrl("/resetSuccess");

    }, (error) =>{
      this.errorMessage = "Operation Not Possible, Retry";
      this.changeDetectorRef.detectChanges();
    });
    }
  }

}
