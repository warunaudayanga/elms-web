import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AuthError } from "../../system/auth/enums";
import { AuthService } from "../services";
import { HttpError } from "../interfaces";
import { AppService } from "../../app.service";
import { ZoomErrors } from "../../system/student/enums/zoom.error.responses.enum";

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
    constructor(private app: AppService, private readonly authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpError<AuthError | ZoomErrors>) => {
                if (!(error.error instanceof ErrorEvent)) {
                    if (
                        error?.error?.status === 401 &&
                        error?.error?.code !== AuthError.AUTH_401_INVALID &&
                        error?.error?.code !== ZoomErrors.ZOOM_401_UNAUTHORIZED
                    ) {
                        this.authService.logout();
                        // this.app.load("/");
                    }
                }
                return throwError(() => error);
            }),
        );
    }
}
