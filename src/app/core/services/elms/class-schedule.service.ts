import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClassSchedule } from "../../entity";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";

@Injectable({
    providedIn: "root",
})
export class ClassScheduleService extends EntityService<ClassSchedule> {
    constructor(protected override http: HttpClient) {
        super(http, Endpoint.SCHEDULE);
    }
}
