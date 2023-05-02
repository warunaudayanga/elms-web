import { BaseEntity } from "./base-entity.interface";
import { User } from "./user.interface";
import { ClassSchedule } from "./schedule.interface";
import { Grade } from "./grade.interface";
import { ClassSubject } from "./subject.interface";
import { ChatRoom } from "./chat-room.interface";
import { ClassStudent } from "./class-student.interface";
import { Assessment } from "./assessment.interface";

export interface ClassRoom extends BaseEntity {
    name: string;
    description?: string;
    payment: number;
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
    chatRoom?: ChatRoom;
    assessments?: Assessment[];
    isPaid?: boolean;
}
