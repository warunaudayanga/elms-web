// noinspection JSUnusedGlobalSymbols

import { KeyValue } from "../interfaces/util.interfaces";

export type Is = [is: string, styleClass: string];

export const omit = <T extends { [key: string]: any }>(obj: T, keys?: (keyof T)[]): void => {
    if (obj) {
        Object.keys(obj).forEach(key => {
            return (obj[key] === undefined || keys?.includes(key)) && delete obj[key];
        });
    }
};

export const is = (str: string, isArr: Is[]): string => {
    for (const [is, value] of isArr) {
        if (str === is) {
            return value;
        }
    }
    return "";
};

export const groupBy = <K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K | null, Array<V>> => {
    const map = new Map<K, Array<V>>();
    list.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
};

export const enumToKeyValue = <T extends { [key: string]: any }>(enumType: T, formatter?: (key: string) => string): KeyValue[] => {
    return Object.keys(enumType)
        .filter(key => isNaN(Number(key)))
        .map(key => ({ key: formatter?.(key) || key, value: enumType[key] }));
};

export const deepCopyObject = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(deepCopyObject) as unknown as T;
    } else if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepCopyObject(value)])) as unknown as T;
    }
    return obj;
};
