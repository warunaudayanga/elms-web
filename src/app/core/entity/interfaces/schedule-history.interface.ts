import { Day } from "../enums/day.enum";
import { BaseEntity } from "./base-entity.interface";
import { ScheduleStatus } from "../enums/schedule-status.enum";
import { ClassSchedule } from "./schedule.interface";

export interface ClassScheduleHistory extends BaseEntity {
    day: Day;
    startTime: string;
    endTime: string;
    status: ScheduleStatus;
    scheduleId: number;
    schedule?: ClassSchedule;
}
