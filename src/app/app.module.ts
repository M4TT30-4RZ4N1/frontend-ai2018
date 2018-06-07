import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PositionService } from './services/position.service';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GeoMapComponent } from './modules/components/customer/geoMap/geoMap.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialModule } from './modules/shared/material/material/material.module';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './modules/components/login/login.component';
import { AdminComponent } from './modules/components/admin/admin.component';
import { UserComponent } from './modules/components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    GeoMapComponent,
    LoginComponent,
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
    HttpClientModule,
    MaterialModule,
    AppRoutingModule 
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
