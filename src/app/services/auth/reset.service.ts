import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { retry } from 'rxjs/operators';

@Injectable()
export class ResetService {

basic_url :String;

constructor(private http: Http) {
    this.basic_url = environment.API_URL;
 }

 getReset(username : string){
    let targetUrl = this.basic_url + "/guest/forgot/"+username +"/";
 

    return this.http.get(targetUrl).pipe(retry(3)).map(resp=>{
      return resp.status===200?true:false
    });
  
 }

 postReset(username : string, code : string, pwd : string){
  let targetUrl = this.basic_url + "/guest/reset/"+ username +"/" + code;
  let body = pwd;
  
  return this.http.post(targetUrl, body).pipe(retry(3)).map(resp=>{
    return resp.status===200?true:false
  });
 }
    
}
