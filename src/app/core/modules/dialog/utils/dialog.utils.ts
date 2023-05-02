// noinspection JSUnusedGlobalSymbols

import { DialogLevel } from "../enums";

export const toFirstCase = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1);
};

export const getIconAndColor = (data: {
    level?: DialogLevel;
    icon?: string;
    colorClass?: string;
    confirm?: boolean;
}): { colorClass: any; icon: any } => {
    let icon;
    let colorClass;

    switch (data.level) {
        case DialogLevel.INFO:
            icon = "icofont icofont-info-circle";
            colorClass = "info";
            break;
        case DialogLevel.SUCCESS:
            icon = "icofont icofont-verification-check";
            colorClass = "success";
            break;
        case DialogLevel.WARNING:
            icon = "icofont icofont-warning";
            colorClass = "warning";
            break;
        case DialogLevel.ERROR:
            icon = "icofont icofont-warning-alt";
            colorClass = "danger";
            break;
        default:
            icon = "icofont icofont-info-circle";
            colorClass = "primary";
    }

    if (data.confirm) {
        icon = "icofont icofont-question";
    }

    if (data.icon) {
        icon = data.icon;
    }

    if (data.colorClass) {
        colorClass = data.colorClass;
    }

    return { icon, colorClass };
};
