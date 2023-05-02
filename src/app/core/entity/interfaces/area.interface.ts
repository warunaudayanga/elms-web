import { BaseEntity } from "./base-entity.interface";
import { User } from "./user.interface";

export interface Area extends BaseEntity {
    name: string;
    users?: User[];
}
