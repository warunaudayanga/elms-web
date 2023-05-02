import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { EntityFilters, PagedEntityFilters } from "../interfaces/entity.interfaces";
import { SortFields } from "../types/entity.types";
import { deleteEmptyFields } from "../utils/entity.utils";
import { environment } from "../../../../environments/environment";
import { IEntityService } from "../interfaces/entity-service.interface";
import { PaginatedResponse } from "../../interfaces/pagination.interfaces";
import { Status } from "../enums/status.enum";

const BASE_URL = `${environment.apiUrl}`;

export abstract class EntityService<T> implements IEntityService<T> {
    protected url: string = `${BASE_URL}/${this.endpoint}`;

    protected constructor(protected http: HttpClient, protected endpoint: string) {}

    create(entity: Partial<T>): Observable<T> {
        return this.http.post<T>(`${this.url}`, entity).pipe(take(1));
    }

    update(id: number, entity: Partial<T>): Observable<T> {
        return this.http.patch<T>(`${this.url}/${id}`, entity).pipe(take(1));
    }

    updateStatus(id: number, status: Status): Observable<T> {
        return this.http.patch<T>(`${this.url}/${id}/status`, { status }).pipe(take(1));
    }

    get(id: number): Observable<T> {
        return this.http.get<T>(`${this.url}/${id}`).pipe(take(1));
    }

    getAll(): Observable<T[]>;

    getAll<Filters extends EntityFilters<T> | PagedEntityFilters<T>>(
        entityFilters?: Filters,
    ): Observable<Filters extends PagedEntityFilters<T> ? PaginatedResponse<T> : T[]>;

    getAll<Filters extends EntityFilters<T> | PagedEntityFilters<T>>(
        entityFilters?: Filters,
    ): Observable<Filters extends PagedEntityFilters<T> ? PaginatedResponse<T> : T[]> {
        let params: HttpParams = new HttpParams();
        if (entityFilters) {
            const { keyword, filters, sort, pagination } = entityFilters as PagedEntityFilters<T>;
            params = EntityService.generateParams({
                keyword,
                ...filters,
                ...pagination,
                sort: EntityService.generateSort(sort),
            });
        }
        return this.http
            .get<Filters extends PagedEntityFilters<T> ? PaginatedResponse<T> : T[]>(`${this.url}`, {
                params,
            })
            .pipe(take(1));
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.url}/${id}`).pipe(take(1));
    }

    deleteMany(ids: number[]): Observable<T> {
        return this.http.post<T>(`${this.url}/delete-many`, { ids }).pipe(take(1));
    }

    public static generateSort(sort?: SortFields): string {
        if (!sort) {
            return "";
        }
        return Object.entries(sort)
            .map(([key, value]) => `${key}.${value}`)
            .join(",");
    }

    public static generateParams(filters: object): HttpParams {
        let params: HttpParams = new HttpParams();
        const filteredParams = deleteEmptyFields(filters);
        if (filteredParams) {
            Object.keys(filteredParams).forEach(k => {
                params = params.append(k, filteredParams[k]);
            });
        }
        return params;
    }
}
