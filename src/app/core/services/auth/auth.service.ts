import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, take, tap } from "rxjs";
import { LoginDto } from "../../../system/auth/dto";
import { User } from "../../entity";
import { SuccessResponse } from "../../interfaces";
import { Store } from "@ngxs/store";
import { SetLoggedUser } from "../../store";
import { AuthError } from "../../../system/auth/enums";
import { Endpoint } from "../../enums";
import configuration from "../../config/configuration";

const AUTH_URL = `${configuration().apiUrl}/${Endpoint.AUTH}`;

@Injectable({
    providedIn: "root",
})
export class AuthService {
    authenticationErrorListener: Subject<AuthError | undefined> = new Subject<AuthError | undefined>();

    constructor(private http: HttpClient, private store: Store) {}

    register(formData: FormData): Observable<User> {
        return this.http.post<User>(`${AUTH_URL}/register`, formData).pipe(take(1));
    }

    login(loginDto: LoginDto): Observable<User> {
        return this.http.post<User>(`${AUTH_URL}/login`, loginDto).pipe(
            take(1),
            tap(user => {
                this.store.dispatch(new SetLoggedUser(user));
            }),
        );
    }

    logout(): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(`${AUTH_URL}/logout`, {}).pipe(take(1));
    }

    setAuthenticationError(authError?: AuthError): void {
        this.authenticationErrorListener.next(authError);
    }

    getAuthenticationErrorListener(): Observable<AuthError | undefined> {
        return this.authenticationErrorListener.asObservable();
    }

    resendVerification(email: string): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(`${AUTH_URL}/resend-verification`, { email });
    }

    verifyAccount(token: string): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(`${AUTH_URL}/verify-account`, { token });
    }
}
