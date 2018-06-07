import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/components/admin/admin.component';
import { UserComponent } from './modules/components/user/user.component';
import { LoginComponent } from './modules/components/login/login.component';
import { GeoMapComponent } from './modules/components/customer/geoMap/geoMap.component';
import { HomeComponent } from './modules/components/home/home.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LogoutComponent } from './modules/components/logout/logout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { path: 'login', component: LoginComponent,},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService]},
  { path: '', component: HomeComponent, canActivate:[AuthGuardService]},
  { path: 'admin', component: AdminComponent, 
  canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: 'ROLE_ADMIN', redirectTo: ''}}
  },
  { path: 'user', component: UserComponent, 
    canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: 'ROLE_USER', redirectTo: ''}}
  },
  { path: 'customer', component: GeoMapComponent, 
    canActivate:[AuthGuardService, NgxPermissionsGuard], data: {permissions: {only: 'ROLE_CUSTOMER', redirectTo: ''}}
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
