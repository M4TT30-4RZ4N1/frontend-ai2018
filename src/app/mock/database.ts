import { Coordinate } from './../models/coordinates';
export class Database {

    private coordinates:Coordinate[]=new Array();
    public constructor(){
      this.coordinates.push(new Coordinate(45.0570218,7.6737289,1527502538));
      this.coordinates.push(new Coordinate(45.0390218,7.6737289,1527502538));
      this.coordinates.push(new Coordinate(45.0450218,7.6737289,1527502538));
      this.coordinates.push(new Coordinate(45.0550218,7.6737289,1527502538));
      this.coordinates.push(new Coordinate(45.0650218,7.6737289,1527502538));
      this.coordinates.push(new Coordinate(45.1050218,7.6737289,1527502538));
      this.coordinates.push(new Coordinate(45.1060218,7.6737289,1527502538));
      this.coordinates.push(new Coordinate(45.1070218,7.6737289,1527502538));
    }
    public getNumPositionInsidePolygon(vs,start:number,end:number):number{
        return this.coordinates.filter(function(element, index, array){
          return element.isInsidePolygon(vs)&&element.isBetweenDate(start,end);
        }).length;  
    }

    public getPositionInsidePolygon(vs,start:number,end:number):Coordinate[]{
      return this.coordinates.filter(function(element, index, array){
        return element.isInsidePolygon(vs)&&element.isBetweenDate(start,end);
      });
  }

  public getPositions():Coordinate[]{
    return this.coordinates;
  }

}