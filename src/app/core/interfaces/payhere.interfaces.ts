import { PayherePaymentStatus } from "../enums/payhere.enums";

export interface PayherePaymentInfo {
    status: PayherePaymentStatus;
    orderId?: string;
}

export interface HashResponse {
    hash: string;
    merchantId: string;
}
