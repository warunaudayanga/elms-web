import { User } from "./user.interface";
import { MessageStatus } from "../enums/message-status.enum";
import { Message } from "./message.interface";

export interface MessageUserStatus {
    id: number;
    status: MessageStatus;
    messageId: number;
    readerId: number;
    message?: Message;
    reader?: User;
    createdAt: Date;
}
