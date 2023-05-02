import { BaseEntity } from "./base-entity.interface";
import { PaymentStatus } from "../enums/payment-status.enum";
import { ClassStudent } from "./class-student.interface";

export interface Payment extends Omit<BaseEntity, "createdBy" | "updatedBy" | "deletedBy"> {
    amount: number;
    currency: string;
    transactionId: string;
    fromDate: string;
    toDate: string;
    status: PaymentStatus;
    classStudent?: ClassStudent;
    stripeData: object;
}
