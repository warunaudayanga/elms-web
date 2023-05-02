export const deleteEmptyFields = (obj: any): any => {
    let objClone: any = {};
    if (obj === null || obj === undefined || obj === "") {
        return objClone;
    }
    for (const key in obj) {
        if (obj[key] !== null && typeof obj[key] === "object") {
            objClone[key] = deleteEmptyFields(obj[key]);
        } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
            objClone[key] = obj[key];
        }
    }
    return objClone;
};
