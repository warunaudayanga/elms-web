// noinspection JSUnusedGlobalSymbols

// Breaks any of this to words -> ['hello', 'world']
// HELLO_WORLD, Hello_World, hello_world, Hello_world, hello_World, HelloWorld",
// helloWorld", Hello-World, hello-world, hello world, Hello World, HELLO WORLD
export const breakToWords = (str?: string): string[] => {
    if (!str) {
        return [];
    }
    try {
        return (
            str
                .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]+|\d+/g)
                ?.map((s: string) => s.toLowerCase()) ?? []
        );
    } catch (e) {
        return [];
    }
};

export const toFirstCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}; // Hello

export const toSnakeCase = (str?: string, caps?: boolean): string => {
    if (!str) {
        return "";
    }
    const snake = breakToWords(str).join("_");
    return caps ? snake.toUpperCase() : snake.toLowerCase();
}; // hello_world

export const toTitleCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => toFirstCase(s))
        .join(" ");
}; // Hello World

export const toCamelCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map((s, i) => (i === 0 ? s.toLowerCase() : toFirstCase(s)))
        .join("");
}; // helloWorld

export const toSentenceCase = (str: string): string => {
    return breakToWords(str)
        .map((s, i) => (i === 0 ? toFirstCase(s) : s.toLowerCase()))
        .join(" ");
}; // Hello world

export const toLowerCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return str.toLowerCase();
}; // hello_world

export const toUpperCase = (str?: string): string => {
    if (!str) {
        return "";
    }
    return str.toUpperCase();
}; // HELLO_WORLD

export const toLowerCaseBreak = (str?: string): string => {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => s.toLowerCase())
        .join(" ");
}; // hello world

export const toUpperCaseBreak = (str?: string): string => {
    if (!str) {
        return "";
    }
    return breakToWords(str)
        .map(s => s.toUpperCase())
        .join(" ");
}; // HELLO WORLD

export const toNumber = (n: number | string): number | undefined => {
    return !isNaN(Number(n)) ? Number(n) : undefined;
}; // {Number} or undefined

export const each = (items: string[], ...fns: ((val: any) => string)[]): string[] => {
    return items.map(itm => {
        let i = itm;
        for (const fn of fns) {
            i = fn(i);
        }
        return i;
    });
};

export const templates = (...fns: ((str: string) => string)[]): ((str: string) => string) => {
    // let resFn: (str: string) => string;
    // let template = "";
    // for (export const fn of fns) {
    //     template = fn;
    // }
    return fns[0];
};

export const yesNo = (value?: boolean): string => {
    return value ? "Yes" : "No";
};
