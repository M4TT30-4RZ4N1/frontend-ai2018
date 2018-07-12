import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyComponent } from './buy.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeoMapComponent } from '../../components/customer/customerGeoMap/customerGeoMap.component';
import { CustomerComponent } from '../../components/customer/customer.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PositionService } from '../../services/position/position.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    LeafletModule
  ],
  declarations: [
    BuyComponent,
    GeoMapComponent,
    CustomerComponent,
  
  ],
  providers: [
    PositionService,
  ]
})
export class BuyModule { }
