import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Coordinate } from '../../models/coordinates';
import { Shape } from '../../models/shape';
import { Transaction } from '../../models/transaction';
import { TimedPosition } from '../../models/timedPosition';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminService {
  //LOCAL REST SERVER
  //serverAddress : String = "http://localhost:8080/admin";
  //MOCK 1
  serverAddress : String = environment.API_URL+"/admin";
  userDataPath : String = "/usersData";
  customerDataPath : String = "/customersData";

  constructor(private webclient : HttpClient) { }

  getUserData() : Observable<TimedPosition[]>{
    return this.webclient.get<TimedPosition[]>(this.serverAddress+""+this.userDataPath+"/");
      /*.pipe(
        map(s => s.getCoordinate())
      );*/
  }
  getCustomerData() : Observable<Transaction[]>{
    return this.webclient.get<Transaction[]>(this.serverAddress+""+this.customerDataPath+"/");
  }
}