export class Link {
    private rel:string;
    private href:String;
    public constructor(rel:string,href:String){
        this.rel = rel;
        this.href = href;
    }
    public getRel(){
        return this.rel;
    }
    public getHref():String{
        return this.href;
    }
}