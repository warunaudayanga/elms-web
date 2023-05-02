import { BaseEntity } from "./base-entity.interface";
import { ClassRoom } from "./class-room.interface";

export interface Grade extends BaseEntity {
    name: string;
    description?: string;
    classRooms?: ClassRoom[];
}
