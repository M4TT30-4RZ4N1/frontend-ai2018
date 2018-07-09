import { Shape } from "./shape";
import { Coordinate } from "./coordinates";
import { Point } from "./point";

export class TimedPosition {
    point : Point;
    timestamp : number;
    public constructor(point : Point, timestamp: any){
        this.point = point;
        if(typeof timestamp === 'number') this.timestamp=timestamp;
        else if(timestamp instanceof Date) this.timestamp=Math.round(timestamp.getTime()/1000);
        else if(typeof timestamp === 'string') this.timestamp=Math.round(new Date(timestamp).getTime()/1000);
    }
    public getPointCoordinate() : Coordinate{
        return new Coordinate(this.point.coordinates[0], this.point.coordinates[1], this.timestamp);
    }
}