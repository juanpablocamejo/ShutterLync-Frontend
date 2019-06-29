import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar) { }

    error(message) {
        this.snackBar.open(message, 'aceptar', { duration: 3000, panelClass: 'msg-snackbar' });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        if (error.status === 404) { return throwError(errorMessage); }
                        errorMessage = error.error.message || 'Error al conectarse con el servidor.';
                    }
                    const showDetail = !(error.error && error.error.showMessage === false);
                    if (!errorMessage.includes(':') || showDetail) {
                        this.error(errorMessage);
                    } else {
                        this.error(errorMessage.substring(0, errorMessage.lastIndexOf(':')));
                    }
                    console.log(error.error.message);
                    return throwError(errorMessage);
                })
            );
    }
}
