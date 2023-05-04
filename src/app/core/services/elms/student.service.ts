import { Injectable } from "@angular/core";
import { Endpoint } from "../../enums";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClassStudent } from "../../entity/interfaces/class-student.interface";
import { PagedEntityFilters } from "../../entity/interfaces/entity.interfaces";
import { ClassRoom } from "../../entity";
import { EntityService } from "../../entity/services/entity.service";
import { PaginatedResponse } from "../../interfaces/pagination.interfaces";
import { Assessment } from "../../entity/interfaces/assessment.interface";
import { QuizAnswer } from "../../../system/shared/interfaces/quiz.interfaces";
import { AssessmentSubmission } from "../../entity/interfaces/assessment-submission.interface";
import configuration from "../../config/configuration";

@Injectable({
    providedIn: "root",
})
export class StudentService {
    private url = `${configuration().apiUrl}/${Endpoint.STUDENT}`;

    constructor(private http: HttpClient) {}

    enrollClass(classRoomId: number): Observable<ClassStudent> {
        return this.http.post<ClassStudent>(`${this.url}/enroll`, { classRoomId });
    }

    findClasses(entityFilters: PagedEntityFilters<ClassRoom>): Observable<PaginatedResponse<ClassRoom>> {
        const { keyword, filters, sort, pagination } = entityFilters as PagedEntityFilters<ClassRoom>;
        const params = EntityService.generateParams({
            keyword,
            ...filters,
            ...pagination,
            sort: EntityService.generateSort(sort),
        });
        return this.http.get<PaginatedResponse<ClassRoom>>(`${this.url}/find-classes`, { params });
    }

    // noinspection JSUnusedGlobalSymbols
    getMyClasses(entityFilters: PagedEntityFilters<ClassRoom>): Observable<PaginatedResponse<ClassRoom>> {
        const { keyword, filters, sort, pagination } = entityFilters as PagedEntityFilters<ClassRoom>;
        const params = EntityService.generateParams({
            keyword,
            ...filters,
            ...pagination,
            sort: EntityService.generateSort(sort),
        });
        return this.http.get<PaginatedResponse<ClassRoom>>(`${this.url}/classes`, { params });
    }

    getClass(id: number): Observable<ClassRoom> {
        return this.http.get<ClassRoom>(`${this.url}/classes/${id}`);
    }

    getAssessment(id: number): Observable<Assessment> {
        return this.http.get<Assessment>(`${this.url}/classes/assessment/${id}`);
    }

    submitAssessment(id: number, answers: QuizAnswer[]): Observable<AssessmentSubmission> {
        return this.http.post<AssessmentSubmission>(`${this.url}/classes/assessment/${id}`, { answers });
    }

    unsubmitAssessment(id: number): Observable<AssessmentSubmission> {
        return this.http.post<AssessmentSubmission>(`${this.url}/classes/assessment/${id}/unsubmit`, {});
    }
}
