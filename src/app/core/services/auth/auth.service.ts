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

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private url: string = `${configuration().apiUrl}/${Endpoint.AUTH}`;

    authenticationErrorListener: Subject<AuthError | undefined> = new Subject<AuthError | undefined>();

    constructor(private http: HttpClient, private store: Store) {}

    register(formData: FormData): Observable<User> {
        return this.http.post<User>(`${this.url}/register`, formData).pipe(take(1));
    }

    login(loginDto: LoginDto): Observable<User> {
        return this.http.post<User>(`${this.url}/login`, loginDto).pipe(
            take(1),
            tap(user => {
                this.store.dispatch(new SetLoggedUser(user));
            }),
        );
    }

    logout(): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(`${this.url}/logout`, {}).pipe(take(1));
    }

    setAuthenticationError(authError?: AuthError): void {
        this.authenticationErrorListener.next(authError);
    }

    getAuthenticationErrorListener(): Observable<AuthError | undefined> {
        return this.authenticationErrorListener.asObservable();
    }

    resendVerification(email: string): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(`${this.url}/resend-verification`, { email });
    }

    verifyAccount(token: string): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(`${this.url}/verify-account`, { token });
    }
}
