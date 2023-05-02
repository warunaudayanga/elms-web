import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Endpoint } from "../../enums";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaymentIntent } from "@stripe/stripe-js";

const STRIPE_URL = `${environment.apiUrl}/${Endpoint.STRIPE}`;

@Injectable({
    providedIn: "root",
})
export class StripeHttpService {
    constructor(private http: HttpClient) {}

    createPaymentIntent(amount: number, metadata: object): Observable<PaymentIntent> {
        return this.http.post<PaymentIntent>(`${STRIPE_URL}/create-payment-intent`, { amount, metadata });
    }
}
