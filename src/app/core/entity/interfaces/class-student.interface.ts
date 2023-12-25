import { ClassRoom } from "./class-room.interface";
import { User } from "./user.interface";
import { Payment } from "./payment.interface";
import { BaseEntity } from "./base-entity.interface";
import { ClassPayment } from "./class-payment.interface";

export interface ClassStudent extends BaseEntity {
    classRoomId?: number;
    studentId?: number;
    classRoom?: ClassRoom;
    student?: User;
    classPayments?: ClassPayment[];
}
