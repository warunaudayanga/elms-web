export interface PaginatedResponse<T> {
    data: T[];
    rowCount: number;
}
