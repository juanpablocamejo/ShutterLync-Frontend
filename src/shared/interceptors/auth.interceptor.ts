import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.currentTokenValue;
        if (!token) { return next.handle(req); }
        return next.handle(req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        }));

    }
}
