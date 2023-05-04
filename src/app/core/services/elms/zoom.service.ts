// noinspection JSUnusedGlobalSymbols

import { Injectable } from "@angular/core";
import { Endpoint } from "../../enums";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { firstValueFrom, Observable, Subject, take } from "rxjs";
import { ZoomMeetingRole } from "../../../system/student/enums/zoom-meeting-role.enum";
import { PaginatedZoomResponse, StartZoomMeetingOptions, ZakTokenResponse, ZoomMeeting } from "../../modules/zoom/interfaces/zoom.interfaces";
import { AppService } from "../../../app.service";
import { AuthState } from "../../store";
import { Role } from "../../entity";
import { SetAuthorized, SetPreviousRoute } from "../../store/zoom/zoom.action";
import { DialogLevel } from "../../modules/dialog/enums";
import { DialogService } from "../../modules/dialog";
import { ZoomErrors } from "../../../system/student/enums/zoom.error.responses.enum";
import { HttpError } from "../../interfaces";
import configuration from "../../config/configuration";

@Injectable({
    providedIn: "root",
})
export class ZoomService {
    private url: string = `${configuration().apiUrl}/${Endpoint.ZOOM}`;

    static meetingStatus: boolean = false;

    meetingStatusListener: Subject<boolean> = new Subject<boolean>();

    startMeetingListener: Subject<StartZoomMeetingOptions> = new Subject<StartZoomMeetingOptions>();

    constructor(private http: HttpClient, private app: AppService, private store: Store, private dialogService: DialogService) {}

    promptAuthorization(): void {
        const res = this.dialogService.confirm(
            "You need to authorize zoom before doing this action!",
            { ok: "Authorize Zoom", cancel: "Cancel" },
            DialogLevel.WARNING,
        );
        res.subscribe(authorize => {
            if (authorize) {
                this.authorizeView();
            }
        });
    }

    handleError(err: HttpError<ZoomErrors>): void {
        if (err.error?.code === ZoomErrors.ZOOM_401_UNAUTHORIZED) {
            this.store.dispatch(new SetAuthorized(false));
            this.promptAuthorization();
            return;
        }
        this.app.error(err.error?.message ?? "Something went wrong!");
    }

    authorizeView(): void {
        if (!window.location.href.match(/zoom-authorize/)) {
            this.store.dispatch(new SetPreviousRoute(window.location.pathname));
        }
        const role = this.store.selectSnapshot(AuthState.role);
        switch (role) {
            case Role.TUTOR:
                this.app.load("tutor/zoom-authorize");
                break;
            case Role.ADMIN:
                this.app.load("admin/zoom-authorize");
        }
    }

    getMeetingStatusListener(): Observable<boolean> {
        return this.meetingStatusListener.asObservable();
    }

    setMeetingStatus(status: boolean): void {
        ZoomService.meetingStatus = status;
        this.meetingStatusListener.next(status);
    }

    getStartMeetingListener(): Observable<StartZoomMeetingOptions> {
        return this.startMeetingListener.asObservable();
    }

    generateSignature(meetingNumber: number, role: ZoomMeetingRole): Observable<{ signature: string }> {
        return this.http.post<{ signature: string }>(`${this.url}/generate-signature`, { meetingNumber, role }).pipe(take(1));
    }

    authorize(): void {
        if (window.location.href.match(/\/(student|tutor)\/my-classes\//)) {
            const { authorizeUrl, responseType, clientId } = configuration().zoom;
            const redirectUri = `${window.location.origin}${window.location.pathname}`;
            window.location.href = `${authorizeUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;
        } else {
            this.app.error("Cannot authorize zoom from this page!");
        }
    }

    generateToken(code: string): Observable<boolean> {
        const redirectUri = `${window.location.origin}${window.location.pathname}`;
        return this.http.post<boolean>(`${this.url}/generate-token`, { code, redirectUri }).pipe(take(1));
    }

    getUser(): any {
        return this.http.post(`${this.url}/user`, {}).pipe(take(1));
    }

    getUserZakToken(): Observable<ZakTokenResponse> {
        return this.http.post<ZakTokenResponse>(`${this.url}/get-zak-token`, {}).pipe(take(1));
    }

    createMeeting(id: number): any {
        return this.http.post(`${this.url}/create-meeting`, { classId: id }).pipe(take(1));
    }

    getMeeting(id: number): Observable<ZoomMeeting> {
        return this.http.get<ZoomMeeting>(`${this.url}/meeting/${id}`).pipe(take(1));
    }

    getMeetings(): Observable<PaginatedZoomResponse<ZoomMeeting>> {
        return this.http.get<PaginatedZoomResponse<ZoomMeeting>>(`${this.url}/meeting/`).pipe(take(1));
    }

    async startMeeting(name: string, meetingId: number, joinUrl: string): Promise<void> {
        try {
            if (!ZoomService.meetingStatus) {
                const signatureRes = await firstValueFrom(this.generateSignature(meetingId, ZoomMeetingRole.HOST));
                const zakTokenRes = await firstValueFrom(this.getUserZakToken());

                if (!signatureRes || !zakTokenRes) {
                    this.app.error("Something went wrong");
                    return;
                }
                const options: StartZoomMeetingOptions = {
                    leaveUrl: window.location.href,
                    signature: signatureRes.signature,
                    zak: zakTokenRes.token,
                    meetingId,
                    joinUrl,
                    username: name,
                };
                this.startMeetingListener.next(options);
                this.setMeetingStatus(true);
            } else {
                this.app.warning("You are already in a meeting!");
            }
        } catch (err) {
            this.handleError(err as HttpError<ZoomErrors>);
        }
    }

    async joinMeeting(name: string, meetingId: number, joinUrl: string): Promise<void> {
        try {
            const signatureRes = await firstValueFrom(this.generateSignature(meetingId, ZoomMeetingRole.PARTICIPANT));
            if (!signatureRes?.signature) {
                this.app.error("No signature found");
                return;
            }
            const options: StartZoomMeetingOptions = {
                leaveUrl: window.location.href,
                signature: signatureRes.signature,
                meetingId,
                joinUrl,
                username: name,
            };
            this.startMeetingListener.next(options);
            this.setMeetingStatus(true);
        } catch (err) {
            this.app.error((err as HttpError)?.error?.message ?? "Something went wrong!");
        }
    }
}
