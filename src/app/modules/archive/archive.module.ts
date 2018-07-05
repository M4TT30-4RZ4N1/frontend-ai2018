import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveComponent } from './archive.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ArchiveComponent]
})
export class ArchiveModule { }
