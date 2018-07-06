import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PositionService } from './services/position/position.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './services/auth/auth.service';
import { Http} from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { JwtManagementService } from './services/jwt/jwt-management.service';
import { LogoutComponent} from './components/logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserDataComponent } from './components/admin/user-data/user-data.component';
import { CustomerDataComponent } from './components/admin/customer-data/customer-data.component';
import { SearchComponent } from './components/user/search/search.component';
import { InsertComponent } from './components/user/insert/insert.component';
import { AdminService } from './services/admin/admin.service';
import { UserService } from './services/user/user.service';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NoAuthGuardService } from './services/auth/no-auth-guard.service';
import { NgxAdminLteModule } from 'ngx-admin-lte';
import { ArchiveModule } from './modules/archive/archive.module';
import { BuyModule } from './modules/buy/buy.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { UploadComponent } from './modules/upload/upload.component';
import { CheckDuplicateUsernameService } from './services/auth/checkDuplicateUsername.service';
import { RegisterService } from './services/auth/register.service';
import { SuccessMessageComponent } from './components/successMessage/successMessage.component';
import { RegistrationGuardService } from './services/auth/RegistrationGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogoutComponent,
    SuccessMessageComponent,
    AdminComponent,
    UserComponent,
    UserDataComponent,
    SearchComponent,
    InsertComponent,
    CustomerDataComponent,
   
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    LeafletModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NgxAdminLteModule,
    AuthModule,
    ArchiveModule,
    UploadModule,
    BuyModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService , multi: true },
    HttpClient,
    PositionService,
    AdminService,
    UserService,
    AuthService,
    CheckDuplicateUsernameService,
    AuthGuardService,
    RegisterService,
    JwtManagementService,
    NoAuthGuardService,
    RegistrationGuardService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

