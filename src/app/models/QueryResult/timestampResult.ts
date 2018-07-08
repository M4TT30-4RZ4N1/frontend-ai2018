export class TimestampResult{
  public user : string;
    public timestamp : number;
  
    constructor( user : string, timestamp : number){
      this.user = user;
      this.timestamp = timestamp;
    }
}