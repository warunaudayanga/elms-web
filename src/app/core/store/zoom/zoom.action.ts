export class SetAuthorized {
    static readonly type = "[Zoom] SetAuthorized";

    constructor(public payload: boolean) {}
}

export class SetPreviousRoute {
    static readonly type = "[Zoom] SetPreviousRoute";

    constructor(public payload?: string) {}
}
