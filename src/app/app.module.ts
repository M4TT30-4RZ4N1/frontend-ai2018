import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { Http} from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { JwtManagementService } from './services/jwt/jwt-management.service';
import { LogoutComponent} from './components/logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions';
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
import { SuccessMessageComponent } from './components/successMessage/successMessage.component';
import { ResetPasswordComponent } from './components/resetPassword/resetPassword.component';
import { ConnectionErrrorComponent } from './components/connectionErrror/connectionErrror.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogoutComponent,
    SuccessMessageComponent,
    ConnectionErrrorComponent
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
    AuthGuardService,
    NoAuthGuardService,
    JwtManagementService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

