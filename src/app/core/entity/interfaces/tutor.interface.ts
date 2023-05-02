import { BaseEntity } from "./base-entity.interface";
import { User } from "./user.interface";
import { ClassRoom } from "./class-room.interface";
import { ClassSubject } from "./subject.interface";

export interface Tutor extends BaseEntity {
    user?: User;
    subjects?: ClassSubject[];
    classRooms?: ClassRoom[];
}
