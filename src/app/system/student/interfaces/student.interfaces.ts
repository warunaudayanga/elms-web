import { PaymentType } from "../../../core/enums/payment-type.enum";

export interface PaymentMeta {
    type: PaymentType;
    amount: string;
    currency?: string;
    orderId?: string;
    studentId: number;
}

export interface ClassFeeMeta extends PaymentMeta {
    type: PaymentType.CLASS_FEE;
    classRoomId: number;
    classStudentId: number;
    fromDate: string;
    toDate: string;
}
