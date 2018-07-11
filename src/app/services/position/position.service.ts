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
import { QueryObj } from '../../models/queryObj';
import { QueryResult } from '../../models/QueryResult/queryResult';
import { ArchiveTransaction } from '../../models/QueryResult/archiveTransaction';

@Injectable()
export class PositionService {

    serverAddress : String = environment.API_URL+"/customer";
    //serverAddress : String = "http://localhost:3000";
    usersPath : String = "/users";
    buyPath : String = "/buy";
    getPath : String = "/search";
    confirmPath : String = this.buyPath+"/confirm";
    constructor(private webclient : HttpClient) { }

    //debug(){console.log("Position Service Working");}

/*
    getAllPositions(){
        let database = new Database();
        let positions = database.getPositions();
        return Observable.of(positions);
    }
*/

    getUsers() : Observable<String[]>{
        return this.webclient.get<String[]>(this.serverAddress+""+this.usersPath);
    
    }
    getPositions(startDate : number, endDate : number, objectToSend : QueryObj) : Observable<QueryResult>{
        //console.log("Sending JSON: " + JSON.stringify(objectToSend));
        //console.log(startDate + " to " + endDate);
        return this.webclient.post<QueryResult>(this.serverAddress+""+this.getPath+"?after="+startDate+"&before="+endDate,
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


    buyPositions(startDate : number, endDate : number, objectToSend : QueryObj) : Observable<ArchiveTransaction[]>{
        //alert("Sending JSON: " + JSON.stringify(objectToSend));
        return this.webclient.post<ArchiveTransaction[]>(this.serverAddress+""+this.buyPath+"?after="+startDate+"&before="+endDate,
                                    JSON.stringify(objectToSend));
    }

    confirmBuy(objectToSend : ArchiveTransaction[]){
        return this.webclient.post(this.serverAddress+""+this.confirmPath,JSON.stringify(objectToSend));
    }

}