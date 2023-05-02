// noinspection JSUnusedGlobalSymbols

export interface IObject {
    [key: string]: IObject | any;
}
export type Key = string | number | symbol;
// @ts-ignore
export type SubKeys<S> = `${keyof S}` | `${keyof S}.${keyof S}` | `${keyof S}.${keyof S}.${keyof S}`;
// @ts-ignore
export type ObjectKeys<E, S> = `${keyof E}` | `${keyof E}.${SubKeys<S>}` | Key;

export type CSSLength = `${number}${"px" | "vw" | "vh" | "rem" | "em" | "%"}` | "auto";

export type CSSCalculation = `calc(${CSSLength} ${"+" | "-" | "*" | "/"} ${CSSLength})`;

export type CSSMeasurement = CSSLength | CSSCalculation;

export interface Columns<T, L extends number> extends Array<T> {
    0: T;
    length: L;
}
