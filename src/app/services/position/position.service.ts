import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shape } from '../../models/shape';
import { Database } from '../../mock/database';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Coordinate } from '../../models/coordinates';
import { environment } from '../../../environments/environment';
import { RequestOptions } from '@angular/http';
import { OpaqueTransaction } from '../../models/opaqueTransaction';

@Injectable()
export class PositionService {

    serverAddress : String = environment.API_URL+"/customers";
    //serverAddress : String = "http://localhost:3000";
    buyPath : String = "/buyPositions";
    getPath : String = "/searchPositions";
    constructor(private webclient : HttpClient) { }

    debug(){console.log("Position Service Working");}

/*
    getAllPositions(){
        let database = new Database();
        let positions = database.getPositions();
        return Observable.of(positions);
    }
*/

    getPositions(startDate : number, endDate : number, coordinates : number[][]) : Observable<OpaqueTransaction>{
        let objectToSend : Shape = new Shape("Polygon", [coordinates]);
        //alert("Sending JSON: " + JSON.stringify(objectToSend));
   
        return this.webclient.post<OpaqueTransaction>(this.serverAddress+""+this.getPath+"?after="+startDate+"&before="+endDate,
                                            JSON.stringify(objectToSend),
                                            {
                                                observe: 'response'
                                            }).pipe(
                                                map(resp => {
                                                    //console.dir(resp);
                                                   // console.dir(resp.headers);
                                                   // console.dir(resp.headers.keys());
                                                   return resp.body;
                                                }
                                                )
                                            );
        //let totPositions = 0;
        //let database = new Database();
        //totPositions = database.getNumPositionInsidePolygon(coordinates, startDate, endDate);
        //return Observable.of(totPositions);
    }


    buyPositions(objectToSend : OpaqueTransaction){
        //alert("Sending JSON: " + JSON.stringify(objectToSend));
        return this.webclient.post(this.serverAddress+""+this.buyPath,JSON.stringify(objectToSend));
        
        //let database = new Database();
        //let positions = database.getPositionInsidePolygon(coordinates, startDate, endDate);
        //return Observable.of(positions);
    }

}