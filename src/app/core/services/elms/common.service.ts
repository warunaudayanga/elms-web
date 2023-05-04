import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { Area } from "../../entity";
import { Endpoint } from "../../enums";
import configuration from "../../config/configuration";

const COMMON_URL = `${configuration().apiUrl}/${Endpoint.COMMON}`;
const AREA_URL = `${COMMON_URL}/area`;

@Injectable({
    providedIn: "root",
})
export class CommonService {
    constructor(private http: HttpClient) {}

    getAreas(): Observable<Area[]> {
        return this.http.get<Area[]>(`${AREA_URL}`).pipe(take(1));
    }
}
