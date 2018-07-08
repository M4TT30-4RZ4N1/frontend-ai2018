import { TimestampResult } from "./timestampResult";
import { UserResult } from "./userResult";
import { PositionResult } from "./positionResult";

export class QueryResult{
    public byTimestamp : TimestampResult[];
    public byPosition : PositionResult[];
    public byUser : UserResult[];
  
    constructor( byTimestamp : TimestampResult[], byPosition: PositionResult[], byUser : UserResult[]){
      this.byTimestamp = byTimestamp;
      this.byPosition = byPosition;
      this.byUser = byUser;
    }
}