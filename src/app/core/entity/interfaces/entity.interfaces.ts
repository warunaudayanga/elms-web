import { SortFields } from "../types/entity.types";

export interface Pagination {
    page?: number;
    limit?: number;
}

export interface EntityFilters<T> {
    keyword?: string;
    filters?: Partial<T>;
    sort?: SortFields<T>;
}

export interface PagedEntityFilters<T> extends EntityFilters<T> {
    pagination: Pagination;
}
