import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { Area } from "../../entity";
import { Endpoint } from "../../enums";
import configuration from "../../config/configuration";

const AREA_URL = "area";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    private url: string = `${configuration().apiUrl}/${Endpoint.COMMON}`;

    constructor(private http: HttpClient) {}

    getAreas(): Observable<Area[]> {
        return this.http.get<Area[]>(`${this.url}/${AREA_URL}`).pipe(take(1));
    }
}
