import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { GeoMapComponent } from './components/customer/customerGeoMap/customerGeoMap.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LogoutComponent } from './components/logout/logout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { UserDataComponent } from './components/admin/user-data/user-data.component';
import { CustomerDataComponent } from './components/admin/customer-data/customer-data.component';
import { SearchComponent } from './components/user/search/search.component';
import { InsertComponent } from './components/user/insert/insert.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NoAuthGuardService } from './services/auth/no-auth-guard.service';
import { LayoutAuthComponent } from 'ngx-admin-lte';
import { ArchiveComponent } from './modules/archive/archive.component';
import { UploadComponent } from './modules/upload/upload.component';
import { BuyComponent } from './modules/buy/buy.component';
import { AuthComponent } from './modules/auth/auth.component';
import { SuccessMessageComponent } from './components/successMessage/successMessage.component';
import { RegistrationGuardService } from './services/auth/RegistrationGuard.service';
import { ResetPasswordComponent } from './components/resetPassword/resetPassword.component';
import { ResetSuccessComponent } from './components/resetSuccess/resetSuccess.component';
import { ResetComponent } from './components/reset/reset.component';
import { ResetCompleteComponent } from './components/resetComplete/resetComplete.component';
import { ActivateComponent } from './components/activate/activate.component';
import { ConnectionErrrorComponent } from './components/connectionErrror/connectionErrror.component';


const routes: Routes = [
  {
    canActivate: [AuthGuardService],
    children: [
      { path:'', pathMatch: 'full', redirectTo:'home'},
      { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService], pathMatch: 'full'},
      { path: 'home', component: HomeComponent, canActivate:[AuthGuardService], pathMatch: 'full'},
      { path: 'archive', component: ArchiveComponent, canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: ['ROLE_USER', 'ROLE_CUSTOMER'], redirectTo: 'home'}, pathMatch: 'full'}},
      { path: 'upload', component: UploadComponent, canActivate:[AuthGuardService, NgxPermissionsGuard],data: {permissions: {only: ['ROLE_USER', 'ROLE_CUSTOMER'], redirectTo: 'home'}, pathMatch: 'full'}},
      { path: 'buy', component: BuyComponent, canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: ['ROLE_USER', 'ROLE_CUSTOMER'], redirectTo: 'home'}, pathMatch: 'full'}},

      // OLD PATHS
      { path: 'admin', component: AdminComponent, 
      canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: 'ROLE_ADMIN', redirectTo: 'home'}
      , pathMatch: 'full'},
      },
      { path: 'user', component: UserComponent, 
        canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: 'ROLE_USER', redirectTo: 'home'}
        , pathMatch: 'full'},
      },
      { path: 'customer', component: CustomerComponent, 
        canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: 'ROLE_CUSTOMER', redirectTo: 'home'}
        , pathMatch: 'full'}
      },
      ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-blue',
      'display_tasks': false,
      'display_notifications': false,
      'display_menu_search': false,
      'display_menu_user': true,
      'display_messages': false,
      'display_control': false,
      'display_user': false,
      /*
      // USE THIS IS YOU WANT TO HIDE SOME TEMPLATE PART
      'boxed_style': false,
      'display_logout': true,
      header_components: []
      */

    }],
    path: '',
  },
  { path:'', pathMatch: 'full', redirectTo:'login'},
  { path: 'login', component: AuthComponent, canActivate:[NoAuthGuardService], pathMatch: 'full'},
  { path: 'registrationSuccess', component: SuccessMessageComponent, canActivate:[NoAuthGuardService, RegistrationGuardService], pathMatch: 'full'},
  { path: 'activate/:id', component:ActivateComponent,  canActivate:[NoAuthGuardService]},
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate:[NoAuthGuardService], pathMatch: 'full' },
  { path: 'resetSuccess', component: ResetSuccessComponent, canActivate:[NoAuthGuardService], pathMatch: 'full' },
  { path: 'reset/:id', component: ResetComponent, canActivate:[NoAuthGuardService]},
  { path: 'resetComplete', component: ResetCompleteComponent, canActivate:[NoAuthGuardService], pathMatch: 'full' },
  { path: '404NotFound', component: PageNotFoundComponent, pathMatch: 'full'},
  { path: 'connectionError', component: ConnectionErrrorComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '404NotFound', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  /*{ enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
