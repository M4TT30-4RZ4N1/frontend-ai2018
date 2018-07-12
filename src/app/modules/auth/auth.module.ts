import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from '../../components/login/login.component';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { ResetPasswordComponent } from '../../components/resetPassword/resetPassword.component';
import { ResetSuccessComponent } from '../../components/resetSuccess/resetSuccess.component';
import { ResetComponent } from '../../components/reset/reset.component';
import { ResetCompleteComponent } from '../../components/resetComplete/resetComplete.component';
import { ActivateComponent } from '../../components/activate/activate.component';
import { AuthService } from '../../services/auth/auth.service';
import { CheckDuplicateUsernameService } from '../../services/auth/checkDuplicateUsername.service';
import { RegisterService } from '../../services/auth/register.service';
import { RegistrationGuardService } from '../../services/auth/RegistrationGuard.service';
import { ResetService } from '../../services/auth/reset.service';
import { ResetGuardianService } from '../../services/auth/resetGuardian.service';
import { ResetCompleteGuardianService } from '../../services/auth/resetCompleteGuardian.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthBarModule,
  ],
  declarations: [
    AuthComponent, 
    LoginComponent,
    RegistrationComponent,
    ActivateComponent,
    ResetPasswordComponent,
    ResetSuccessComponent,
    ResetComponent,
    ResetCompleteComponent
  ],
  providers:[
    AuthService,
    CheckDuplicateUsernameService,
    RegisterService,
    RegistrationGuardService,
    ResetService,
    ResetGuardianService,
    ResetCompleteGuardianService
  ]
})
export class AuthModule { }
