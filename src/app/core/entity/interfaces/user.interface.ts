import { BaseEntity } from "./base-entity.interface";
import { Area, GuardianRelationship, Role } from "../index";
import { Tutor } from "./tutor.interface";
import { ClassStudent } from "./class-student.interface";

export interface User extends BaseEntity {
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    role: Role;
    dob: string;
    phone: string;
    address: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianAddress?: string;
    guardianRelationship?: GuardianRelationship;
    school?: string;
    profilePicture?: string;
    roleId?: number;
    areaId?: number;
    tutorId?: number;
    area?: Area;
    tutor?: Tutor;
    classStudents?: ClassStudent[];
}
