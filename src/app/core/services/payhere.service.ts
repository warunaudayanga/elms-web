import { Injectable } from "@angular/core";
import { Payhere, PayherePayment } from "../../payhere";
import { Observable, Subject } from "rxjs";
import { MD5 } from "crypto-js";

@Injectable({
    providedIn: "root",
})
export class PayhereService {
    private payhere: Payhere;

    private onCompletedSub: Subject<string> = new Subject<string>();

    private onDismissedSub: Subject<void> = new Subject<void>();

    private onErrorSub: Subject<any> = new Subject<any>();

    constructor() {
        this.payhere = window.payhere;

        this.payhere.onCompleted = (orderId: string): void => {
            this.onCompletedSub.next(orderId);
        };

        // Payment window closed
        this.payhere.onDismissed = (): void => {
            this.onDismissedSub.next();
        };

        // Error occurred
        this.payhere.onError = (error: any): void => {
            this.onErrorSub.next(error);
        };
    }

    generateHash(payment: PayherePayment): string {
        const merchantId = payment.merchant_id;
        const orderId = payment.order_id;
        const amount = payment.amount;
        const currency = payment.currency;
        const merchantSecret = "MzcyMDUxNzMzMjE0MTUxMjg3NzkxMDIzMjUzOTg2NTg5ODcwMTI3";
        const hashInput = `${merchantId}${orderId}${amount}${currency}${merchantSecret.toUpperCase()}`;
        return MD5(hashInput).toString().toUpperCase();
    }

    onCompleted(): Observable<string> {
        return this.onCompletedSub.asObservable();
    }

    onDismissed(): Observable<void> {
        return this.onDismissedSub.asObservable();
    }

    onError(): Observable<any> {
        return this.onErrorSub.asObservable();
    }

    startPayment(payment: PayherePayment): any {
        return this.payhere.startPayment(payment);
    }
}
