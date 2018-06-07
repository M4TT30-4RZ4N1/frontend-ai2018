import { Shape } from "./shape";

export class TimedPosition {
    private id: String;
    private point : Shape;
    private user : String;
    private timestamp : number;
    public constructor(id: String, point : Shape, user : String, timestamp : number){
        this.id=id;
        this.user=user;
        this.point=point;
        this.timestamp=timestamp;
      }
}