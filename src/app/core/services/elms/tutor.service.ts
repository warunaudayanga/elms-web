// noinspection JSUnusedGlobalSymbols

import { Injectable } from "@angular/core";
import { Endpoint } from "../../enums";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PagedEntityFilters } from "../../entity/interfaces/entity.interfaces";
import { ClassRoom, ClassSchedule } from "../../entity";
import { EntityService } from "../../entity/services/entity.service";
import { PaginatedResponse } from "../../interfaces/pagination.interfaces";
import { ClassDto } from "../../../system/tutor/dtos/class.dto";
import { ScheduleDto } from "../../../system/tutor/dtos/schedule.dto";
import { AssessmentDto } from "../../../system/shared/dtos/assessment.dto";
import { Assessment } from "../../entity/interfaces/assessment.interface";
import configuration from "../../config/configuration";

@Injectable({
    providedIn: "root",
})
export class TutorService {
    private url: string = `${configuration().apiUrl}/${Endpoint.TUTOR}`;

    constructor(private http: HttpClient) {}

    getMyClasses(entityFilters: PagedEntityFilters<ClassRoom>): Observable<PaginatedResponse<ClassRoom>> {
        const { keyword, filters, sort, pagination } = entityFilters as PagedEntityFilters<ClassRoom>;
        const params = EntityService.generateParams({
            keyword,
            ...filters,
            ...pagination,
            sort: EntityService.generateSort(sort),
        });
        return this.http.get<PaginatedResponse<ClassRoom>>(`${this.url}/${Endpoint.CLASSES}`, { params });
    }

    getClass(id: number): Observable<ClassRoom> {
        return this.http.get<ClassRoom>(`${this.url}/${Endpoint.CLASSES}/${id}`);
    }

    createClass(createClassDto: ClassDto): Observable<ClassRoom> {
        return this.http.post<ClassRoom>(`${this.url}/${Endpoint.CLASSES}`, createClassDto);
    }

    updateClass(id: number, updateClassDto: Partial<ClassDto>): Observable<ClassRoom> {
        return this.http.patch<ClassRoom>(`${this.url}/${Endpoint.CLASSES}/${id}`, updateClassDto);
    }

    setSchedule(classRoomId: number, setScheduleDto: ScheduleDto): Observable<ClassSchedule> {
        return this.http.put<ClassSchedule>(`${this.url}/${Endpoint.CLASSES}/${classRoomId}/schedule`, setScheduleDto);
    }

    createAssessment(classRoomId: number, assessment: AssessmentDto): Observable<Assessment> {
        return this.http.post<Assessment>(`${this.url}/${Endpoint.CLASSES}/${classRoomId}/${Endpoint.ASSESSMENT}`, assessment);
    }

    updateAssessment(id: number, assessment: Partial<AssessmentDto>): Observable<Assessment> {
        return this.http.patch<Assessment>(`${this.url}/${Endpoint.CLASSES}/${Endpoint.ASSESSMENT}/${id}`, assessment);
    }
}
