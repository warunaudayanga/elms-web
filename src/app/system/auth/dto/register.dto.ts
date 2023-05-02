import { GuardianRelationship } from "../../../core/entity";

// noinspection JSUnusedGlobalSymbols
export interface RegisterDto {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: Date | string;
    phone: string;
    areaId: number;
    address: string;
    school: string;
    guardianName: string;
    guardianPhone: string;
    guardianAddress: string;
    guardianRelationship: GuardianRelationship;
    tutorId?: number;
}
