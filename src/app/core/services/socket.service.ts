/* eslint-disable lines-between-class-members */
import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { filter, fromEvent, map, Observable, Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
import { MultiEventResponse, WSErrorResponse, WSMessage, WSMessageResponse } from "../interfaces/socket.interfaces";
import { v4 as uuid } from "uuid";
import { AppEvent } from "../enums/app-event.enum";
import { ErrorResponse } from "../interfaces";
import { AppService } from "../../app.service";
import { SocketEvent } from "../enums/socket-event";

@Injectable({
    providedIn: "root",
})
export class SocketService {
    socket!: Socket;

    queue: string[] = [];

    constructor(private readonly app: AppService) {}

    connect(): void {
        if (!this.socket?.connected) {
            this.socket = io(environment.socketUrl, { transports: ["websocket"] });

            // eslint-disable-next-line no-console
            this.onEvent(SocketEvent.CONNECT)?.subscribe(() => console.log("connected:", this.socket.connected));

            this.onEvent(SocketEvent.MESSAGE)?.subscribe(res => {
                const response = res as WSMessageResponse;
                console.log("=================================="); // eslint-disable-line no-console
                console.log("RID   : ", response.rid); // eslint-disable-line no-console
                console.log("Event : ", response.event); // eslint-disable-line no-console
                console.log("Data  : ", response.data); // eslint-disable-line no-console
                console.log("----------------------------------"); // eslint-disable-line no-console
            });

            this.onError()?.subscribe(err => {
                this.app.error(err.message);
            });
        }
    }

    onEvent<R = any, ErrEnum = any>(event: SocketEvent): Observable<WSMessageResponse<R> | WSErrorResponse<ErrEnum>> | null {
        if (!this.socket) {
            return null;
        }
        return (
            fromEvent<WSMessageResponse<R> | WSErrorResponse<ErrEnum>>(this.socket, event).pipe(
                filter(data => !(data?.rid && this.queue.includes(data.rid))),
            ) ?? null
        );
    }

    onMessage<R = any>(event: AppEvent): Observable<R> | null;
    onMessage<R = any>(events: AppEvent[]): Observable<MultiEventResponse<R>> | null;
    onMessage<R = any>(eventOrEvents: AppEvent | AppEvent[]): Observable<R | MultiEventResponse> | null {
        return (
            this.onEvent<R | MultiEventResponse>(SocketEvent.MESSAGE)?.pipe(
                filter(res => (Array.isArray(eventOrEvents) ? eventOrEvents.includes(res?.event) : eventOrEvents === res?.event)),
                map(res =>
                    Array.isArray(eventOrEvents)
                        ? { event: (res as WSMessageResponse<R>).event, data: (res as WSMessageResponse<R>).data }
                        : (res as WSMessageResponse<R>).data,
                ),
            ) ?? null
        );
    }

    onError<ErrEnum = any>(): Observable<ErrorResponse<ErrEnum>> | null {
        return this.onEvent<ErrEnum>(SocketEvent.ERROR)?.pipe(map(err => (err as WSErrorResponse<ErrEnum>).response)) ?? null;
    }

    sendMessage<D = any>(event: AppEvent, data: D): string {
        const rid = uuid();
        const wsMessage: WSMessage<D> = { event, data, rid };
        this.socket.emit(SocketEvent.MESSAGE, wsMessage);
        return rid;
    }

    async sendMessageAsync<D = any, R = any, ErrEnum = any>(event: AppEvent, data: D): Promise<R> {
        const subs: Subscription[] = [];
        const res = await new Promise((resolve: (value: R) => void, reject: (reason?: ErrorResponse<ErrEnum>) => void): void => {
            const rid = uuid();
            this.queue.push(rid);
            const wsMessage: WSMessage<D> = { event, data, rid };
            this.socket.emit(SocketEvent.MESSAGE, wsMessage);
            const success = fromEvent<WSMessageResponse<R>>(this.socket, SocketEvent.MESSAGE).subscribe(response => {
                if (response.rid === rid) {
                    this.queue = this.queue.filter(qRid => qRid !== rid);
                    resolve(response.data);
                }
            });
            const error = fromEvent<WSErrorResponse<ErrEnum>>(this.socket, SocketEvent.ERROR).subscribe(response => {
                if (response.rid === rid) {
                    this.queue = this.queue.filter(qRid => qRid !== rid);
                    reject(response.response);
                }
            });
            subs.push(success, error);
        });
        subs.forEach(sub => sub.unsubscribe());
        return res;
    }

    disconnect(): void {
        this.socket?.disconnect();
    }
}
