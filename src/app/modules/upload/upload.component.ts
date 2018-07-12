import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
 
// const URL = '/api/';
const URL = environment.API_URL + '/user/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public uploader: FileUploader = null;
  public hasBaseDropZoneOver: boolean = false;

  constructor() { }

  ngOnInit() {
    let token = window.localStorage.getItem('ai-token');
    //token = 'Bearer '+ token;
    //console.log(token);
    //console.log(URL);
    this.uploader = new FileUploader({
                    url: URL,
                    isHTML5: true,
                    method: 'POST',
                    itemAlias: 'file',
                    authTokenHeader:  'authorization',
                    authToken: 'Bearer '+ token,
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader._onErrorItem = (error) => {
      let errorCause = JSON.parse(error._xhr.responseText);
      alert("Error during the upload of "+ error.file.name+".\nCheck file format, please.\n"); 
    };
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 

}
