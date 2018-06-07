import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Database } from '../../mock/database';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PositionService {

constructor(private http: HttpClient) { }

debug(){console.log("Position Service Working");}


getAllPositions(){
    let database = new Database();
    let positions = database.getPositions();
    return Observable.of(positions);
}

getPositions(startDate : number, endDate : number, coordinates : number[][]) : number{
    let totPositions = 0;
    // given a specific polygon
    let database = new Database();
    totPositions = database.getNumPositionInsidePolygon(coordinates, startDate, endDate);
    return totPositions;
}

buyPositions(startDate : number, endDate : number, coordinates : number[][]){
    let database = new Database();
    let positions = database.getPositionInsidePolygon(coordinates, startDate, endDate);
    return positions;
}

}
