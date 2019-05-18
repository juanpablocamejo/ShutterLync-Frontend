import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

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
                        errorMessage = error.error.message || 'Error al conectarse con el servidor.';
                    }
                    // window.alert(errorMessage);
                    this.error(errorMessage);
                    console.log(error.error.message);
                    return throwError(errorMessage);
                })
            );
    }
}
