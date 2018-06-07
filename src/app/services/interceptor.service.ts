import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";


@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(){}

    intercept(request: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const Token = window.localStorage.getItem("ai-token");

        if (Token) {

            const cloned = request.clone({
                headers: request.headers.set("Authorization",
                    "Bearer " + Token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(request);
        }
    }
}
