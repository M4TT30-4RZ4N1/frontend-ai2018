import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/components/admin/admin.component';
import { UserComponent } from './modules/components/user/user.component';
import { LoginComponent } from './modules/components/login/login.component';
import { GeoMapComponent } from './modules/components/customer/customerGeoMap/customerGeoMap.component';
import { HomeComponent } from './modules/components/home/home.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LogoutComponent } from './modules/components/logout/logout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { UserDataComponent } from './modules/components/admin/user-data/user-data.component';
import { CustomerDataComponent } from './modules/components/admin/customer-data/customer-data.component';
import { SearchComponent } from './modules/components/user/search/search.component';
import { InsertComponent } from './modules/components/user/insert/insert.component';
import { PageNotFoundComponent } from './modules/components/pageNotFound/pageNotFound.component';
import { CustomerComponent } from './modules/components/customer/customer.component';
import { NoAuthGuardService } from './services/auth/no-auth-guard.service';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo:'login'},
  { path: 'login', component: LoginComponent, canActivate:[NoAuthGuardService], pathMatch: 'full'},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService], pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuardService], pathMatch: 'full'},
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
  { path: '404NotFound', component: PageNotFoundComponent,  pathMatch: 'full'},
  { path: '**', redirectTo: '404NotFound', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  /*{ enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }