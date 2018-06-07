import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PositionService } from './services/position/position.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GeoMapComponent } from './modules/components/customer/geoMap/geoMap.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialModule } from './modules/shared/material/material.module';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './modules/components/login/login.component';
import { AdminComponent } from './modules/components/admin/admin.component';
import { UserComponent } from './modules/components/user/user.component';
import { AuthService } from './services/auth/auth.service';
import { Http, HttpModule } from '@angular/http';
import { HomeComponent } from './modules/components/home/home.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { JwtManagementService } from './services/jwt/jwt-management.service';
import { LogoutComponent } from './modules/components/logout/logout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SidebarComponent } from './modules/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    GeoMapComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService , multi: true },
    PositionService, 
    AuthService, 
    AuthGuardService, 
    JwtManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
