declare interface PayherePayment {
    sandbox: boolean;
    merchant_id: string;
    notify_url: string;
    return_url: string;
    cancel_url: string;
    order_id: string;
    amount: string;
    currency: string;
    hash: string;
    items: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    delivery_address?: string;
    delivery_country?: string;
    delivery_city?: string;
    custom_1?: string;
    custom_2?: string;
}

declare interface Payhere {
    onCompleted: (orderId: string) => void;
    onDismissed: () => void;
    onError: (error: any) => void;
    orderKey: string | null;
    startPayment: (payment: PayherePayment) => void;
}

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Window {
        payhere: Payhere;
    }
}

export { Payhere, PayherePayment };
