import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    basic_url :String;

constructor(private http : Http, private  router: Router) {
    this.basic_url = environment.API_URL;
 }

login( username : string, password : string) {

    let result = false;

    let headers = new Headers( );
        headers.append('Access-Control-Request-Headers', 'x-requested-with');
        headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );
        headers.append('authorization','Basic Zm9vQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=');
    
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('client_id', 'fooClientIdPassword');

    let opts = new RequestOptions();
    opts.headers = headers;    

    let targetUrl = this.basic_url + "oauth/token";

    let postObservable: Observable<any> = this.http.post(
        targetUrl,
        body.toString(),
        opts
    );

    let jsonObservable: Observable<any> = postObservable.map(
        ( response ) => {
            return response.json();
        }
    );

    jsonObservable.subscribe((json) =>{
        console.log(json);
        console.log(json.access_token);
        window.localStorage.setItem('ai-token', json.access_token);
        this.router.navigate(['/']);
    });

}


}
