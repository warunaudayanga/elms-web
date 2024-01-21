/* eslint-disable camelcase */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";
import { Payment, PaymentStatus } from "../../entity";
import { firstValueFrom, Observable, take } from "rxjs";
import { HashResponse } from "../../interfaces/payhere.interfaces";
import { PayhereService } from "./payhere.service";
import { v4 as uuid } from "uuid";
import configuration from "../../config/configuration";
import { PayHerePayment } from "../../../payhere";
import { PaymentData } from "../../interfaces/payment.interfaces";
import { AppEvent } from "../../enums/app-event.enum";
import { SocketService } from "../socket.service";
import { PaymentMeta } from "../../../system/student/interfaces/student.interfaces";
import { PaymentOccurredMessage } from "../../entity/interfaces/class-payment.interface";

@Injectable({
    providedIn: "root",
})
export class PaymentService extends EntityService<Payment> {
    constructor(protected override http: HttpClient, private readonly payhereService: PayhereService, private readonly socketService: SocketService) {
        super(http, Endpoint.PAYMENT);
    }

    generateHash(orderId: string, amount: string, currency: string): Observable<HashResponse> {
        return this.http.post<HashResponse>(`${this.url}/generate-hash`, { orderId, amount, currency }).pipe(take(1));
    }

    async pay(paymentData: PaymentData<any>): Promise<boolean | undefined> {
        const order_id: string = uuid();
        const amount: string = Number(paymentData.amount).toFixed(2);
        const currency: string = configuration().payhere.currency;

        paymentData.metadata.currency = currency;
        paymentData.metadata.orderId = order_id;

        try {
            const { hash } = await firstValueFrom(this.generateHash(order_id, amount, currency));

            const payment: PayHerePayment = {
                sandbox: configuration().payhere.sandbox,
                merchant_id: configuration().payhere.merchantId,
                notify_url: configuration().payhere.notifyUrl,
                return_url: configuration().payhere.returnUrl,
                cancel_url: configuration().payhere.cancelUrl,
                order_id,
                amount,
                currency,
                hash,
                items: paymentData.item,
                first_name: paymentData.user.firstName,
                last_name: paymentData.user.lastName,
                email: paymentData.user.email,
                phone: paymentData.user.phone,
                address: paymentData.user.address,
                city: "",
                country: configuration().payhere.country,
                delivery_address: "",
                delivery_city: "",
                delivery_country: "",
                custom_1: JSON.stringify(paymentData.metadata),
                custom_2: "",
            };

            const payments: PaymentOccurredMessage<PaymentMeta>[] = [];
            const paymentSub = this.socketService.onMessage(AppEvent.PAYMENT_OCCURRED)?.subscribe((res: PaymentOccurredMessage<PaymentMeta>) => {
                payments.push(res);
            });

            const paymentInfo = await this.payhereService.pay(payment);

            payments.forEach(p => {
                if (p.meta.orderId === paymentInfo.orderId) {
                    paymentSub?.unsubscribe();
                    Promise.resolve(p.status === PaymentStatus.PAID);
                }
            });

            paymentSub?.unsubscribe();
            return;
        } catch (err: any) {
            return Promise.reject(err);
        }
    }
}
