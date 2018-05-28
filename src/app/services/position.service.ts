import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shape } from '../models/shape';
import { Database } from '../mock/database';

@Injectable()
export class PositionService {

constructor(private http: HttpClient) { }

debug(){console.log("Position Service Working");}

getPositions(startDate : number, endDate : number, coordinates : number[][]) : number{
    let totPositions = 0;
    // given a specific polygon
    let database = new Database();
    totPositions = database.getNumPositionInsidePolygon(coordinates, startDate, endDate);
    return totPositions;
}

buyPositions(){
    
}

}
