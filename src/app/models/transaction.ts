export class Transaction {
    customerId : String;
    userId : String;
    nPositions : number;
    price : number;
    constructor(customerId:String,userId:string,nPositions:number,price:number){
        this.customerId=customerId;
        this.userId=userId;
        this.nPositions=nPositions;
        this.price=price;
      }
}
