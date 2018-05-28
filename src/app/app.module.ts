import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PositionService } from './services/position.service';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GeoMapComponent } from './modules/components/geoMap/geoMap.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialModule } from './modules/components/material/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    GeoMapComponent
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
    MaterialModule 
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
