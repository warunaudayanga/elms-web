import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";
import { Assessment } from "../../entity/interfaces/assessment.interface";

@Injectable({
    providedIn: "root",
})
export class AssessmentService extends EntityService<Assessment> {
    constructor(protected override http: HttpClient) {
        super(http, Endpoint.ASSESSMENT);
    }
}
