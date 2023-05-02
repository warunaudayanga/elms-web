import { ClassRoom } from "./class-room.interface";
import { BaseEntity } from "./base-entity.interface";
import { Message } from "./message.interface";
import { User } from "./user.interface";

export interface ChatRoom extends BaseEntity {
    name?: string;
    classRoomId?: number;
    classRoom?: ClassRoom;
    users?: User[];
    messages?: Message[];
}
