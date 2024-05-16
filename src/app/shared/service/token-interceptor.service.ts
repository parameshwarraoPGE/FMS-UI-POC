import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //get authtoken and intercept and send it in request
    let userToken = sessionStorage.getItem('authToken');
    
    if(userToken){
      const modifiedReq = req.clone({ 
        headers: req.headers.set('x-auth-token', `${userToken}`),
      });
      return next.handle(modifiedReq);
    }
    
    return next.handle(req);
    
  }
  
}
