import { Day } from "../../../core/entity";

export interface ScheduleDto {
    day: Day;
    startTime: string;
    endTime: string;
}
