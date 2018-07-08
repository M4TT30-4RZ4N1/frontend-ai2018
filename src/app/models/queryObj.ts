import { Shape } from "./shape";

export class QueryObj{
    geoFilter : Shape;
    usersFilter : String[];
  
    constructor( geoFilter : Shape, usersFilter : String[]){
      this.geoFilter = geoFilter;
      this.usersFilter = usersFilter;
    }
}