import { Injectable } from "@angular/core";
import { Endpoint } from "../../enums";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaymentIntent } from "@stripe/stripe-js";
import configuration from "../../config/configuration";

@Injectable({
    providedIn: "root",
})
export class StripeHttpService {
    private url: string = `${configuration().apiUrl}/${Endpoint.STRIPE}`;

    constructor(private http: HttpClient) {}

    createPaymentIntent(amount: number, metadata: object): Observable<PaymentIntent> {
        return this.http.post<PaymentIntent>(`${this.url}/create-payment-intent`, { amount, metadata });
    }
}
