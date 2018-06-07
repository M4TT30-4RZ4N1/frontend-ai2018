import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Coordinate } from '../../models/coordinates';
import { TimedPosition } from '../../models/timedPosition';


@Injectable()
export class UserService {

  serverAddress : String = "";
  searchPath : String = "";
  insertPath : String = "";

  constructor(private http : HttpClient) { 

  }

  searchPositions(startDate : number, endDate : number) : Observable<Coordinate[]>{
      //return this.webclient.get<Coordinate[]>(this.serverAddress+""+this.searchPath+"?start="+startDate+"&end="+endDate);
      return Observable.of([]);
    }

  sendPositions(positionToSend : TimedPosition[]){
      return this.http.post(this.serverAddress+""+this.insertPath, JSON.stringify(positionToSend));
  }

}
