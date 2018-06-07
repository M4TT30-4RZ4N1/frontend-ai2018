import { Injectable } from '@angular/core';
import { Shape } from '../models/shape';
import { Database } from '../mock/database';

@Injectable()
export class PositionService {

constructor() { }

debug(){console.log("Position Service Working");}

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
