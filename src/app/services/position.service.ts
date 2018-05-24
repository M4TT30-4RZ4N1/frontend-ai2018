import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PositionService {

constructor(private http: HttpClient) { }

debug(){console.log("Position Service Working");}

getPositions(){
    this.http.get("http://jsonplaceholder.typicode.com/todos").subscribe(jsonResponse =>{
        console.log(jsonResponse);
    });

}

}
