export interface NgItem {
    label: string;
    disabled?: boolean;
    action: () => void;
}
