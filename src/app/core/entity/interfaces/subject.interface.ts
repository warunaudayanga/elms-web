import { Tutor } from "./tutor.interface";
import { BaseEntity } from "./base-entity.interface";
import { ClassRoom } from "./class-room.interface";

export interface ClassSubject extends BaseEntity {
    name: string;
    description?: string;
    tutors?: Tutor[];
    classRooms?: ClassRoom[];
}
