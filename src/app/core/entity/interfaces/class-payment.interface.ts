import { ClassRoom } from "./class-room.interface";
import { User } from "./user.interface";
import { Payment } from "./payment.interface";
import { BaseEntity } from "./base-entity.interface";
import { ClassStudent } from "./class-student.interface";
import { ClassFeeMeta } from "../../../system/student/interfaces/student.interfaces";
import { PaymentStatus } from "../enums/payment-status.enum";

export interface ClassPayment extends BaseEntity {
    classRoomId?: number;
    classRoom?: ClassRoom;
    classStudentId?: number;
    classStudent?: ClassStudent;
    payment?: Payment;
}

export interface PaymentOccurredMessage<Meta = any> {
    meta: Meta;
    status: PaymentStatus;
}
