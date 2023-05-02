import { Observable } from "rxjs";
import { PagedEntityFilters } from "./entity.interfaces";
import { PaginatedResponse } from "../../interfaces/pagination.interfaces";
import { Status } from "../enums/status.enum";

export interface IEntityService<T> {
    create(entity: Partial<T>): Observable<T>;

    update(id: number, entity: Partial<T>): Observable<T>;

    updateStatus(id: number, status: Status): Observable<T>;

    get(id: number): Observable<T>;

    getAll(entityFilters?: PagedEntityFilters<T>): Observable<PaginatedResponse<T> | T[]>;

    delete(id: number): Observable<T>;

    deleteMany(ids: number[]): Observable<T>;
}
