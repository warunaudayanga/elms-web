export type SortFields<T = any> = {
    [key in keyof T]?: "ASC" | "DESC";
};
