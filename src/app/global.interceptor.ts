import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  // private hostName = 'http://localhost:3000/';

  private hostName = 'https://api2.air-ways.online/';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const newURL = this.hostName + request.url;

    const newRequest = request.clone({ url: newURL });

    return next.handle(newRequest)
      .pipe(
        catchError((err) => {
          const error = err.statusText;
          return throwError(() => error);
        }),
      );
  }

}
