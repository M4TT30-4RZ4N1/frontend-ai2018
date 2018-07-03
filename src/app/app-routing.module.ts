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
import { LayoutAuthComponent } from 'ngx-admin-lte';


const routes: Routes = [
  {
    canActivate: [AuthGuardService],
    children: [
      { path:'', pathMatch: 'full', redirectTo:'home'},
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
      ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-black',
      'display_tasks': false,
      'display_notifications': false,
      'display_menu_search': false,
      'display_menu_user': false,
      'display_messages': false,
      'display_control': false,
      /*
      // USE THIS IS YOU WANT TO HIDE SOME TEMPLATE PART
      'boxed_style': false,

      
      'display_user': false,
      



      'display_logout': true,
      header_components: []
      */
    }],
    path: '',
  },
  { path:'', pathMatch: 'full', redirectTo:'login'},
  { path: 'login', component: LoginComponent, canActivate:[NoAuthGuardService], pathMatch: 'full'},
  { path: '404NotFound', component: PageNotFoundComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '404NotFound', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  /*{ enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
