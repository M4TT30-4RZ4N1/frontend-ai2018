import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Shape } from '../../models/shape';
import { Transaction } from '../../models/transaction';


@Injectable()
export class AdminService {

  serverAddress : String = "";
  userDataPath : String = "";
  customerDataPath : String = "";

  constructor(private http : HttpClient) { }

  getUserData() : Observable<Shape[]>{
    return this.http.get<Shape[]>(this.serverAddress+""+this.userDataPath+"/");
      /*.pipe(
        map(s => s.getCoordinate())
      );*/
  }
  getCustomerData() : Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.serverAddress+""+this.customerDataPath+"/");
  }
}
