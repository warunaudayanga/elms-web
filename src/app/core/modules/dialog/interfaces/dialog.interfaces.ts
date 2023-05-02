import { DialogLevel } from "../enums";
import { CSSLength } from "./common.interfaces";

export interface DialogButtons {
    ok?: string;
    cancel?: string;
}

export interface DialogOptions<T = any> {
    title: string;
    message?: string;
    icon?: string;
    colorClass?: string;
    level?: DialogLevel;
    buttons?: DialogButtons;
    width?: CSSLength;
}

export interface DialogConfig<T = any> {
    data?: T;
    wait?: boolean;
}

export interface AlertOptions extends DialogOptions {
    confirm?: boolean;
}

export type AlertData = AlertOptions;
