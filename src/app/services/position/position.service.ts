import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shape } from '../../models/shape';
import { Database } from '../../mock/database';
import { Observable } from 'rxjs/Rx';
import { Coordinate } from '../../models/coordinates';
import { environment } from '../../../environments/environment';

@Injectable()
export class PositionService {

    serverAddress : String = environment.API_URL+"/customers";
    //serverAddress : String = "http://localhost:3000";
    buyPath : String = "/buyPositions";
    getPath : String = "/listPositions";
    constructor(private webclient : HttpClient) { }

    debug(){console.log("Position Service Working");}

/*
    getAllPositions(){
        let database = new Database();
        let positions = database.getPositions();
        return Observable.of(positions);
    }
*/

    getPositions(startDate : number, endDate : number, coordinates : number[][]) : Observable<number>{
        let objectToSend : Shape = new Shape("Polygon", [coordinates]);
        alert("Sending JSON: " + JSON.stringify(objectToSend));
        return this.webclient.post<number>(this.serverAddress+""+this.getPath+"?after="+startDate+"&before="+endDate,objectToSend);
        //let totPositions = 0;
        //let database = new Database();
        //totPositions = database.getNumPositionInsidePolygon(coordinates, startDate, endDate);
        //return Observable.of(totPositions);
    }


    buyPositions(startDate : number, endDate : number, coordinates : number[][])  : Observable<Coordinate[]> {
        let objectToSend : Shape = new Shape("Polygon", [coordinates]);
        alert("Sending JSON: " + JSON.stringify(objectToSend));
        return this.webclient.post<Coordinate[]>(this.serverAddress+""+this.buyPath,objectToSend);
        
        //let database = new Database();
        //let positions = database.getPositionInsidePolygon(coordinates, startDate, endDate);
        //return Observable.of(positions);
    }

}