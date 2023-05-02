import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClassRoom } from "../../entity";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";

@Injectable({
    providedIn: "root",
})
export class ClassRoomService extends EntityService<ClassRoom> {
    constructor(protected override http: HttpClient) {
        super(http, Endpoint.CLASS_ROOM);
    }
}
