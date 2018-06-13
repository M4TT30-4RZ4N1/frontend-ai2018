export class Point{
    
        type : string;
        coordinates : number[];
        
        constructor( type : string,  coordinates : number[]){
            this.type = type;
            this.coordinates = coordinates;
        } 

        public getType() : String{
            return this.type;
        }
        public getCoordinates() : number[]{
            return this.coordinates;
        }
    }
    