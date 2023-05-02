/* eslint-disable no-console */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ZoomService } from "../../../../services/elms/zoom.service";
import { Subscription } from "rxjs";
import { AppService } from "../../../../../app.service";
import { HttpError } from "../../../../interfaces";
import { environment } from "../../../../../../environments/environment";
import { StartZoomMeetingOptions } from "../../interfaces/zoom.interfaces";

@Component({
    selector: "app-zoom-web-view",
    templateUrl: "./zoom-web-view.component.html",
    styleUrls: ["./zoom-web-view.component.scss"],
})
export class ZoomWebViewComponent implements OnInit, OnDestroy {
    maximized: boolean = true;

    showButtons: boolean = false;

    startMeetingSubscription?: Subscription;

    timeout?: NodeJS.Timer;

    constructor(private readonly app: AppService, private readonly zoomService: ZoomService) {}

    async ngOnInit(): Promise<void> {
        await new Promise(resolve => {
            this.timeout = setInterval(() => {
                if (typeof ZoomMtg !== "undefined") resolve(true);
            }, 500);
        });

        clearInterval(this.timeout);

        await ZoomMtg.setZoomJSLib(environment.zoom.lib.url, environment.zoom.lib.dir);
        // loads WebAssembly assets
        await ZoomMtg.preLoadWasm();
        await ZoomMtg.prepareWebSDK();
        // loads language files, also passes any error messages to the ui
        // noinspection JSIgnoredPromiseFromCall
        await ZoomMtg.i18n.load("en-US");
        await ZoomMtg.i18n.reload("en-US");

        this.startMeetingSubscription = this.zoomService.getStartMeetingListener().subscribe((options: StartZoomMeetingOptions) => {
            const password = options.joinUrl.split("pwd=")[1];

            ZoomMtg.init({
                leaveUrl: options.leaveUrl,
                disablePreview: true,
                success: (success: any) => {
                    console.log("success 1: ", success);
                    const zoomRoot = document.getElementById("zmmtg-root");
                    const newParent = document.getElementById("zmmtg-web-view");

                    if (zoomRoot && newParent) {
                        newParent.appendChild(zoomRoot);
                        zoomRoot.style.display = "block";
                    }

                    ZoomMtg.join({
                        signature: options.signature,
                        sdkKey: environment.zoom.clientId,
                        meetingNumber: String(options.meetingId),
                        passWord: password,
                        userName: options.username,
                        zak: options.zak,
                        success: () => {
                            this.showButtons = true;
                        },
                        error: (error: any) => {
                            console.log("error 1: ", error);
                        },
                    });
                },
                error: (err: HttpError) => {
                    console.log("error 1: ", err);
                    this.app.error(err.error?.message ?? "Something went wrong while starting meeting!");
                },
            });
        });
    }

    minimize(): void {
        this.maximized = false;
    }

    maximize(): void {
        this.maximized = true;
    }

    ngOnDestroy(): void {
        this.startMeetingSubscription?.unsubscribe();
    }
}
