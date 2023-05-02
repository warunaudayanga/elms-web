import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClassSubject } from "../../entity";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";

@Injectable({
    providedIn: "root",
})
export class ClassSubjectService extends EntityService<ClassSubject> {
    constructor(protected override http: HttpClient) {
        super(http, Endpoint.SUBJECT);
    }
}
