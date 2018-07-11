import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { rootRenderNodes } from "@angular/core/src/view";


@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private router : Router){}

    intercept(request: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
                  
        const Token = window.localStorage.getItem("ai-token");

        if (Token) {

            const cloned = request.clone({
                headers: request.headers.set("Authorization","Bearer " + Token)
                .set("Content-Type","application/json")
                //.set("withCredential", "true")
                //.set("Access-Control-Expose-Headers", "Set-Cookie")               
            });

            return next.handle(cloned).do(event => {}, err => {
                if(err instanceof HttpErrorResponse){
                    this.router.navigateByUrl("/connectionError");
                }
            });
        }
        else {
            return next.handle(request).do(event => {}, err => {
                if(err instanceof HttpErrorResponse){
                    this.router.navigateByUrl("/connectionError");
                }
            });
        }
    }

}
