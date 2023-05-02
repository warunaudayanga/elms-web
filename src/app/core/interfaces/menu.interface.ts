export interface MenuItem {
    label?: string;
    icon?: string;
    active?: boolean;
    action?: (event?: any) => void;
    routerLink?: string | string[];
    items?: MenuItem[];
    separator?: boolean;
}
