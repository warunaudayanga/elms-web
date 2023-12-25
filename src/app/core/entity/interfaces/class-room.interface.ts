import { BaseEntity } from "./base-entity.interface";
import { User } from "./user.interface";
import { ClassSchedule } from "./schedule.interface";
import { Grade } from "./grade.interface";
import { ClassSubject } from "./subject.interface";
import { ChatRoom } from "./chat-room.interface";
import { ClassStudent } from "./class-student.interface";
import { Assessment } from "./assessment.interface";
import { ClassPayment } from "./class-payment.interface";

export interface ClassRoom extends BaseEntity {
    name: string;
    description?: string;
    payment: string;
    changeRequest?: null | Omit<Partial<ClassRoom>, "changeRequest" | keyof BaseEntity>;
    gradeId: number;
    subjectId: number;
    tutorId: number;
    scheduleId?: number;
    grade?: Grade;
    subject?: ClassSubject;
    tutor?: User;
    schedule?: ClassSchedule;
    classStudents?: ClassStudent[];
    classPayments?: ClassPayment[];
    chatRoom?: ChatRoom;
    assessments?: Assessment[];
    isPaid?: boolean;
}
