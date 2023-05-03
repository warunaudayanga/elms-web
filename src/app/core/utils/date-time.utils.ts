// noinspection JSUnusedGlobalSymbols

import { AbstractControl, ValidationErrors } from "@angular/forms";
import moment from "moment";
import { Day } from "../entity";

export const now = (format?: string): string => {
    return moment().format(format);
};

export const stringToDate = (entity: { [key: string]: any }): void => {
    Object.keys(entity).forEach(key => {
        if (Array.isArray(entity[key])) {
            entity[key].forEach((e: any) => (e ? stringToDate(e) : undefined));
            if (entity[key]) stringToDate(entity[key]);
        } else if (typeof entity[key] === "object") {
            if (entity[key]) stringToDate(entity[key]);
        } else if (
            String(entity[key]).match(
                /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/,
            )
        ) {
            entity[key] = new Date(entity[key]);
        } else if (String(entity[key]).match(/(\d{4}-[01]\d-[0-3]\d)/)) {
            entity[key] = new Date(entity[key]);
        }
    });
};

export const validateBsDatepickerDate = (control: AbstractControl): ValidationErrors | null => {
    return String(control.value) === "Invalid Date" ? { date: true } : null;
};

export const dateTimeHtml = (date: Date): string => {
    return `<span class="datetime">
                <div class="date">${moment(date).format("YYYY-MM-DD")}</div>
                <div class="time">${moment(date).format("hh:mm:ss a")}</div>
            </span>`;
};

export const hhmmaToHHmmss = (hh: string, mm: string, a: "am" | "pm" | string): string => {
    let HH = a === "am" ? (hh === "12" ? "00" : hh) : String(Number(hh) + 12);
    if (HH.length < 2) {
        HH = `0${HH}`;
    }
    return `${HH}:${mm}:00` as string;
};

export const time24To12 = (str: string): string => moment(`2000-01-01 ${str}`).format("hh:mm a");

export const nextOccurringDateTime = (dayOfWeek: Day, startTime: string, endTime: string): { isOnline: boolean; nextOccurrence: moment.Moment } => {
    const now = moment();
    const nextDayOfWeek = moment().day(dayOfWeek);
    const nextStartTime = moment(nextDayOfWeek.format("YYYY-MM-DD") + " " + startTime);

    let isOnline = false;
    if (now.isSameOrAfter(nextStartTime)) {
        if (now.isBetween(nextStartTime, moment(nextDayOfWeek.format("YYYY-MM-DD") + " " + endTime))) {
            isOnline = true;
        }
        nextStartTime.add(1, "weeks");
    }

    return { isOnline, nextOccurrence: nextStartTime };
};

export const hmsToDate = (hms: string): Date => {
    return moment(hms, "HH:mm:ss").toDate();
};

export const ymdToDate = (ymd: string): Date => {
    return moment(ymd, "YYYY-MM-DD").toDate();
};

export const dateToHms = (date: Date): string => {
    return moment(date).format("HH:mm:ss");
};

export const dateToYmd = (date: Date): string => {
    return moment(date).format("YYYY-MM-DD");
};

export const isThisMonth = (date: string): boolean => {
    return moment(date, "YYYY-MM-DD").isSame(moment(), "month");
};
