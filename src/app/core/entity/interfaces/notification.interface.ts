import { BaseEntity } from "./base-entity.interface";
import { User } from "./user.interface";
import { NotificationStatus } from "../enums/notification-status.enum";

export interface Notification extends Omit<BaseEntity, "status"> {
    content: string;
    userId: number;
    user?: User;
    status: NotificationStatus;
}
