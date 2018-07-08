import { Point } from "../point";

export class PositionResult{
    public user : String;
    public point : Point;
  
    constructor( user: String, point : Point){
      this.point = point;
      this.user = user;
    }
}