import { ClassRoom } from "./class-room.interface";
import { User } from "./user.interface";
import { Payment } from "./payment.interface";

export interface ClassStudent {
    classRoomId?: number;
    studentId?: number;
    classRoom?: ClassRoom;
    student?: User;
    payments?: Payment[];
}
