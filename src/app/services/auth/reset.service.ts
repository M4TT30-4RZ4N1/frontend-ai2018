import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ResetService {

basic_url :String;

constructor(private http: Http) {
    this.basic_url = environment.API_URL;
 }

 getReset(username : string){
    let targetUrl = this.basic_url + "/guest/forgot/"+username +"/";
    let params = new URLSearchParams();
    let localPath = window.location.hostname+":"+window.location.port;
    params.append("forgotcallback", localPath);

    return this.http.get(targetUrl, {
        params: {
          forgotcallback: localPath,
        }}).map(resp=>{
      return resp.status===200?true:false
    });
  
 }

 postReset(username : string, code : string, pwd : string){
  let targetUrl = this.basic_url + "/guest/forgot/"+ username +"/" + code;
  let body = pwd;
  
  return this.http.post(targetUrl, body).map(resp=>{
    return resp.status===200?true:false
  });
 }
    
}
