export class Transaction {
    private customerId : String;
    private userId : String;
    private nPosition : number;
    private price : number;
    public constructor(customerId:String,userId:string,nPosition:number,price:number){
        this.customerId=customerId;
        this.userId=userId;
        this.nPosition=nPosition;
        this.price=price;
      }
}
