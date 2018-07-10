import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RegisterService } from '../../services/auth/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  
  username : string | null;
  code : string | null;
  activationResult : boolean = false;
  changeDetectorRefs : ChangeDetectorRef[] = [];

  constructor(
    private registerService : RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.activationResult = false;
    const id = this.route.snapshot.paramMap.get('id');
    let parameters = id.split('@');

    //check parameter == 2 // else error
    let l = parameters.length;

    if(l == 2){
      this.username = parameters[0];
      this.code = parameters[1];
      this.subscription = this.registerService.activate(this.username, this.code).subscribe(
        (success) => {
          if(success == true){
            this.activationResult = true;
            this.changeDetectorRef.detectChanges();
          }
          else{
            this.activationResult = false;
            this.changeDetectorRef.detectChanges();
          }
        }, (error) => {
          this.activationResult = false;
          this.changeDetectorRef.detectChanges();
        }
      );

    }
    else{
      console.log("not formatted like: username@code");
      this.router.navigateByUrl("/login");
    }
  }

  ngOnDestroy(): void {
    if(this.subscription !== null && this.subscription !== undefined){
      this.subscription.unsubscribe();
    }
  }

  redirectToLogin(){
    this.router.navigate(["/login"]);
  }



}
