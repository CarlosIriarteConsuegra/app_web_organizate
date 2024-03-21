import { catchError, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/seguridad/token.service';
import { AuthService } from '../services/seguridad/auth.service';
import { TokenDto } from '../models/seguridad/token.dto';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }
    let intReq = request;
    const token = this.tokenService.getToken();
    intReq = this.addToken(request, token);
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: TokenDto = new TokenDto();
        return this.authService.postRefresh(dto).pipe(concatMap((data: any) => {
          console.log('refreshing...');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(request, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenService.deslogger();
        this.router.navigate(['/auth/login']);
        return throwError(err);
      }
    }));
  }

  private addToken(request: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}];