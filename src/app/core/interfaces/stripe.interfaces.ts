import { PaymentMetadata } from "../types/stripe.types";

export interface StripePayment<T = any> {
    amount: number;
    metadata: PaymentMetadata<T>;
}
