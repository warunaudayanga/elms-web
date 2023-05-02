import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Grade } from "../../entity";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";

@Injectable({
    providedIn: "root",
})
export class GradeService extends EntityService<Grade> {
    constructor(protected override http: HttpClient) {
        super(http, Endpoint.GRADE);
    }
}
