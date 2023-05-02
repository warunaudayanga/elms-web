import { BaseEntity } from "./base-entity.interface";
import { MessageType } from "../enums/message-type.enum";
import { User } from "./user.interface";
import { ChatRoom } from "./chat-room.interface";
import { MessageUserStatus } from "./message-user-status.interface";

export interface Message extends BaseEntity {
    message: string;
    type: MessageType;
    senderId: number;
    chatRoomId: number;
    sender?: User;
    chatRoom?: ChatRoom;
    messageUserStatus?: MessageUserStatus[];
}
