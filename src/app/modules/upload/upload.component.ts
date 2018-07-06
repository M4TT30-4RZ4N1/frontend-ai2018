import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
 
// const URL = '/api/';
const URL = environment.API_URL + '/user/archives';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;

  constructor() { }

  ngOnInit() {
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 

}
