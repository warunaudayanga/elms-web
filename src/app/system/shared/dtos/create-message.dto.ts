import { MessageType } from "../../../core/entity";

export interface CreateMessageDto {
    message: string;
    type: MessageType;
    chatRoomId: number;
}
