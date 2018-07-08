export class TimestampResult{
  public user : String;
    public timestamp : number;
  
    constructor( user : String, timestamp : number){
      this.user = user;
      this.timestamp = timestamp;
    }
}