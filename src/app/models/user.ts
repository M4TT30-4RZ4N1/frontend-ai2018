export class User{
    email : string;
    username : string;
    password : string;
  
    constructor( e :string, u : string, p : string){
      this.email = e;
      this.username = u;
      this.password = p;
    }
}