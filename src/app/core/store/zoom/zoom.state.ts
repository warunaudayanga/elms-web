import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetAuthorized, SetPreviousRoute } from "./zoom.action";

interface ZoomStateModel {
    authorized?: boolean;
    previousRoute?: string;
}

@State<ZoomStateModel>({
    name: "zoom",
})
@Injectable()
export class ZoomState {
    constructor() {}

    @Selector()
    static isAuthorized(state: ZoomStateModel): boolean {
        return Boolean(state.authorized);
    }

    @Selector()
    static getPreviousRoute(state: ZoomStateModel): string {
        return state.previousRoute ?? "/";
    }

    @Action(SetAuthorized)
    setAuthorized({ patchState }: StateContext<ZoomStateModel>, action: SetAuthorized): void {
        patchState({ authorized: action.payload });
    }

    @Action(SetPreviousRoute)
    setPreviousRoute({ patchState }: StateContext<ZoomStateModel>, action: SetPreviousRoute): void {
        patchState({ previousRoute: action.payload });
    }
}
