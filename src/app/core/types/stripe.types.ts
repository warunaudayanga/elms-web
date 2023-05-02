import { PaymentType } from "../enums/payment-type.enum";

export type PaymentMetadata<T = any> = { [key: string]: any } & { type: PaymentType } & T;
