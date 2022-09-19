import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token = ''

  constructor(authService: AuthService) {
    authService.token$.subscribe(newToken => {
      this.token = newToken
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.token) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      })
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
