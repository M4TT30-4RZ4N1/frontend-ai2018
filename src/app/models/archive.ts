import { Link } from "./link";

export class Archive {
    owner:string;
    filename:string;
    counter:number;
    deleted:boolean;
    _links:Link;
    public constructor(owner:string,filename:string,counter:number,deleted:boolean,_link:Link){
        this.owner = owner;
        this.filename = filename;
        this.counter = counter;
        this.deleted = deleted;
        this._links = _link;
    }
    public getLink():Link{
        return this._links;
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
