import { Point } from "./point";

export class Shape{

    type : string;
    coordinates : Point[][];

    constructor( type : string,  coordinates : Point[][]){
        this.type = type;
        this.coordinates = coordinates;
    }
    
}
