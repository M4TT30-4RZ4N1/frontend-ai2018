export class Coordinate {
    private lat:number;
    private lng:number;
    private timestamp:number;
    public constructor(latitude:number,longitude:number,timestamp:any){
      this.lat=latitude;
      this.lng=longitude;
      if(typeof timestamp === 'number') this.timestamp=timestamp;
      else if(timestamp instanceof Date) this.timestamp=Math.round(timestamp.getTime()/1000);
      else if(typeof timestamp === 'string') this.timestamp=Math.round(new Date(timestamp).getTime()/1000);
    }
    public isBetweenDate(start:number,end:number):boolean{
      return this.timestamp>=start && this.timestamp<=end;
    }
    public isInsidePolygon (vs):boolean{
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
      
      var x = this.lng, y = this.lat;
      
      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][1], yi = vs[i][0];
          var xj = vs[j][1], yj = vs[j][0];
          
          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      
      return inside;
    }

    getLat(){
      return this.lat;
    }
    getLng(){
      return this.lng;
    }
    getTimestamp(){
      return this.timestamp;
    }
}