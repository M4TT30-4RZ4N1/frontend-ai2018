import { Link } from "./link";

export class Archive {
    owner:string;
    filename:string;
    counter:number;
    deleted:boolean;
    public constructor(owner:string,filename:string,counter:number,deleted:boolean){
        this.owner = owner;
        this.filename = filename;
        this.counter = counter;
        this.deleted = deleted;
    }
    public getOwner(){
        return this.owner;
    }
    public getFilename(){
        return this.filename;
    }
    public getCounter(){
        return this.counter;
    }
    public getDeleted(){
        return this.deleted;
    }
}