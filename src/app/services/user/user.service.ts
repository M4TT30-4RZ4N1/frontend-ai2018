import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from '../../models/coordinates';
import { Observable } from 'rxjs/Rx';
import { TimedPosition } from '../../models/timedPosition';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  //serverAddress : String = "http://localhost:8080/users";
  serverAddress : String = environment.API_URL+"/users";
  searchPath : String = "/positions";
  insertPath : String = "/positions";

  constructor(private webclient : HttpClient) { 

  }

  searchPositions(startDate : number, endDate : number) : Observable<TimedPosition[]>{
      return this.webclient.get<TimedPosition[]>(this.serverAddress+""+this.searchPath+"?after="+startDate+"&before="+endDate);
      //return Observable.of([]);
    }

  sendPositions(positionToSend : TimedPosition[]){
      //alert("Sending JSON: " + JSON.stringify(positionToSend));
      return this.webclient.post(this.serverAddress+""+this.insertPath, JSON.stringify(positionToSend));
  }

}