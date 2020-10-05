import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        location.reload(true);
      }
      if (err.status === 400) {
        let errorMessages = "";
        return throwError(errorMessages);
      }
      if (err.status === 0) {
        return throwError("Server down. Please try after some time");
      }

      const error = err.error.message || err.statusText;
      console.log("In global error interceptor.." + error);
      return throwError(error);
    }))
  }
}
