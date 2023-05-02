// noinspection JSUnusedGlobalSymbols

export const transposeArray = <T = any>(arr: T[][]): T[][] => arr[0].map((col, i) => arr.map(row => row[i]));

export const sum = (arr: number[]): number => arr.reduce((acc, val) => acc + val);

export const replaceItem = <T = any>(arr: T[], item: T, key: keyof T, merge?: boolean): T[] => {
    const index = arr.findIndex(itm => itm[key] === item[key]);
    if (index !== -1) {
        return arr.splice(index, 1, merge ? { ...arr[index], ...item } : item);
    }
    arr.push(item);
    return arr;
};
