import { Point } from "../point";

export class PositionResult{
    public user : string;
    public point : Point;
  
    constructor( user: string, point : Point){
      this.point = point;
      this.user = user;
    }
}