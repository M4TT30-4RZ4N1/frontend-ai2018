import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class JwtManagementService {

constructor() { }
checkAuthTimeExpired(token : string) : boolean{

    if(token === null || token === undefined){ // cookie not set
        return false;
    }
    
    // get expire time from token
    // get current time stamp (take out last 3 numbers cause expired is set with seconds, not milliseconds)
    let expireTimeStamp = this.getJwtExpireTime(token);
    let now = new Date().getTime();
    let s = "" + now;
    s = s.slice(0,-3);
    now = parseInt(s);
    
  
    if(expireTimeStamp === null || expireTimeStamp === undefined){ // there not exist any token
        return false;
    }
    else if(expireTimeStamp > now ){ // token is not expired!
        return true;
    }
    else {  // token is expired
        return false;
    }
  }
  
  getDecodeJwt(token : string){
    try{
        return jwt_decode(token);
    }
    catch{
        return null;
    }
  
  }
  
  getJwtExpireTime(token : string){
    let tokenInfo = this.getDecodeJwt(token);
    let expireTimestamp = null;
  
    if(tokenInfo !== null && tokenInfo !== undefined){
      expireTimestamp = tokenInfo.exp;
    }
    return expireTimestamp;
  }
  getJwtUsername(token : string){
    let tokenInfo = this.getDecodeJwt(token);
    let username = null;
  
    if(tokenInfo !== null && tokenInfo !== undefined){
        username = tokenInfo.user_name;
    }
    return username;
  }
  getJwtRoles(token : string){
    let tokenInfo = this.getDecodeJwt(token);
    let roles = null;

    if(tokenInfo !== null && tokenInfo !== undefined){
        roles = tokenInfo.authorities;
        
      }
    else{
        roles = [];
    }
      
    return roles;
  }
  
}
