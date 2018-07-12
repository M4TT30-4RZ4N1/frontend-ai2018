import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveComponent } from './archive.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchiveService } from '../../services/archive/archive.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ArchiveComponent],
  providers: [
    ArchiveService,
  ]
})
export class ArchiveModule { }
