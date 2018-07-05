import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from '../../components/login/login.component';
import { RegistrationComponent } from '../../components/registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AuthComponent, 
    LoginComponent,
    RegistrationComponent
  ]
})
export class AuthModule { }
