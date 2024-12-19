import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class WorkbenchNoRepeatProvider implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
        headers: this.addExtraHeaders(req.headers)
      });
    return next.handle(modifiedReq);
  }

  private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
    headers = headers.append('X-1p-Repeat-400', 'false');
    return headers;
  } 

}