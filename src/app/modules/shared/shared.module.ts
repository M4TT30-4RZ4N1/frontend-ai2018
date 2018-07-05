import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from "../../app-routing.module";

@NgModule({
    exports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        MaterialModule,
    ]
  })
  export class SharedModule {}