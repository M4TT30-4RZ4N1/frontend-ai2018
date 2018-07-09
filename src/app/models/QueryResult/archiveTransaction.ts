export class ArchiveTransaction{
    public filename : string;
    public purchased : boolean;
  
    constructor( filename: string, purchased : boolean){
      this.filename = filename;
      this.purchased = purchased;
    }
}