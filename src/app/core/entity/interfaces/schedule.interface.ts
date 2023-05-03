import { Day } from "../enums/day.enum";
import { BaseEntity } from "./base-entity.interface";
import { ClassRoom } from "./class-room.interface";
import { ZoomMeeting } from "../../modules/zoom/interfaces/zoom.interfaces";
import { ClassScheduleHistory } from "./schedule-history.interface";

export interface ClassSchedule extends BaseEntity {
    day: Day;
    startTime: string;
    endTime: string;
    meetingId?: number;
    joinUrl?: string;
    changeRequest?: Omit<Partial<ClassSchedule>, "changeRequest" | keyof BaseEntity> | null;
    classRoom?: ClassRoom;
    scheduleHistory?: ClassScheduleHistory[];
    meeting?: ZoomMeeting;
    needZooAuthentication?: boolean;
}
