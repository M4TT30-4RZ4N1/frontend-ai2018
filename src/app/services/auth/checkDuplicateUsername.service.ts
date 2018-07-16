import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { retry } from 'rxjs/operators';

@Injectable()
export class CheckDuplicateUsernameService {
  basic_url :String;

  constructor(private http: Http) {
    this.basic_url = environment.API_URL;
  }
  check(username:string){
    let targetUrl = this.basic_url + "/guest/checkUser/"+username;
    //console.log(targetUrl);
    return this.http.get(targetUrl).pipe(retry(3)).map(resp=>{
      return resp.status===200?true:false
    });
  }
}
