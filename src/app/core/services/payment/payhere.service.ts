import { Injectable } from "@angular/core";
import { Payhere, PayherePayment } from "../../../payhere";
import { ReplaySubject, Subject, takeUntil } from "rxjs";
import { PayherePaymentStatus } from "../../enums/payhere.enums";
import { PayherePaymentInfo } from "../../interfaces/payhere.interfaces";

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

        this.payhere.onDismissed = (): void => {
            this.onDismissedSub.next();
        };

        this.payhere.onError = (error: any): void => {
            this.onErrorSub.next(error);
        };
    }

    pay(payment: PayherePayment): Promise<PayherePaymentInfo> {
        const finished$: ReplaySubject<boolean> = new ReplaySubject(1);
        const finish = (): void => {
            finished$.next(true);
            finished$.unsubscribe();
        };

        return new Promise((resolve, reject) => {
            this.onCompletedSub.pipe(takeUntil(finished$)).subscribe((orderId: string) => {
                finish();
                resolve({
                    status: PayherePaymentStatus.COMPLETED,
                    orderId,
                });
            });

            this.onDismissedSub
                .asObservable()
                .pipe(takeUntil(finished$))
                .subscribe(() => {
                    finish();
                    resolve({
                        status: PayherePaymentStatus.DISMISSED,
                    });
                });

            this.onErrorSub
                .asObservable()
                .pipe(takeUntil(finished$))
                .subscribe(error => {
                    finish();
                    reject(error);
                });

            try {
                this.payhere.startPayment(payment);
            } catch (error) {
                reject(error);
                finished$.next(true);
                finished$.unsubscribe();
            } finally {
            }
        });
    }
}
