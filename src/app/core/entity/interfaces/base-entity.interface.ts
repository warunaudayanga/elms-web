import { Status } from "../index";

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export interface BaseEntity {
    id: number;
    status: Status | string;
    createdAt: Date;
    createdBy?: User;
    updatedAt: Date;
    updatedBy?: User;
    deletedAt?: Date;
    deletedBy?: User;
}
