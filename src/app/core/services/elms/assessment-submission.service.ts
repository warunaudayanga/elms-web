import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";
import { AssessmentSubmission } from "../../entity/interfaces/assessment-submission.interface";

@Injectable({
    providedIn: "root",
})
export class AssessmentSubmissionService extends EntityService<AssessmentSubmission> {
    constructor(protected override http: HttpClient) {
        super(http, Endpoint.ASSESSMENT_SUBMISSION);
    }
}
