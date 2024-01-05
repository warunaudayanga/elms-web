import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../entity";
import { EntityService } from "../../entity/services/entity.service";
import { Endpoint } from "../../enums";
import { Observable, take } from "rxjs";
import { TutorDto } from "../../../system/admin/dtos/tutor.dto";

@Injectable({
    providedIn: "root",
})
export class UserService extends EntityService<User> {
    constructor(protected override http: HttpClient) {
        super(http, Endpoint.USER);
    }

    createTutor(createTutorDto: TutorDto): Observable<User> {
        return this.http.post<User>(`${this.url}/tutor`, createTutorDto).pipe(take(1));
    }

    updateTutor(id: number, updateTutorDto: TutorDto): Observable<User> {
        return this.http.patch<User>(`${this.url}/tutor/${id}`, updateTutorDto).pipe(take(1));
    }

    deleteTutor(id: number): Observable<User> {
        return this.http.delete<User>(`${this.url}/tutor/${id}`).pipe(take(1));
    }

    getAllTutors(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}/tutor`).pipe(take(1));
    }
}
