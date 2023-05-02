import { AppEvent } from "../enums/app-event.enum";
import { ErrorResponse } from "./response.interfaces";

export interface WSMessage<T = any, Event = AppEvent> {
    rid?: string;
    event: Event;
    data: T;
}

export interface WSErrorResponse<Enum = any, Event = AppEvent> {
    rid?: string;
    event: Event;
    response: ErrorResponse<Enum>;
}

export interface WSMessageResponse<R = any, Event = AppEvent> {
    rid?: string;
    event: Event;
    data: R;
}

export interface MultiEventResponse<R = any, Event = AppEvent> {
    event: Event;
    data: R;
}
