import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PositionService } from './services/position/position.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GeoMapComponent } from './modules/components/customer/customerGeoMap/customerGeoMap.component';
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
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions';
import { SidebarComponent } from './modules/components/sidebar/sidebar.component';
import { UserDataComponent } from './modules/components/admin/user-data/user-data.component';
import { CustomerDataComponent } from './modules/components/admin/customer-data/customer-data.component';
import { SearchComponent } from './modules/components/user/search/search.component';
import { InsertComponent } from './modules/components/user/insert/insert.component';
import { AdminService } from './services/admin/admin.service';
import { UserService } from './services/user/user.service';
import { PageNotFoundComponent } from './modules/components/pageNotFound/pageNotFound.component';
import { CustomerComponent } from './modules/components/customer/customer.component';
import { NoAuthGuardService } from './services/auth/no-auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    PageNotFoundComponent,
    GeoMapComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    UserComponent,
    CustomerComponent,
    UserDataComponent,
    CustomerDataComponent,
    SearchComponent,
    InsertComponent
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
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService , multi: true },
    HttpClient,
    PositionService,
    AdminService, 
    UserService, 
    AuthService, 
    AuthGuardService, 
    JwtManagementService,
    NoAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
