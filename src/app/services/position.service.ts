import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shape } from '../models/shape';

@Injectable()
export class PositionService {

constructor(private http: HttpClient) { }

debug(){console.log("Position Service Working");}

getPositions() : number{
    let totPositions = 0;
    // given a specific polygon
    this.http.get("http://jsonplaceholder.typicode.com/todos").subscribe(jsonResponse =>{
        console.log(jsonResponse);
    });


    return totPositions;

}

buyPositions(){
    
}

}
