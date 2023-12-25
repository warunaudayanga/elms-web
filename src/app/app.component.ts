/* eslint-disable camelcase */
import { Component } from "@angular/core";
import { AppService } from "./app.service";
import { ZoomService } from "./core/services/elms/zoom.service";
import { Subscription } from "rxjs";
import { SocketService } from "./core/services/socket.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    status: boolean = false;

    meetingStatusSub: Subscription;

    constructor(public readonly app: AppService, private readonly socketService: SocketService, private readonly zoomService: ZoomService) {
        this.app.loggedInListener.subscribe(loggedIn => {
            if (loggedIn) {
                this.socketService.connect();
            } else {
                this.socketService.disconnect();
            }
        });
        this.meetingStatusSub = this.zoomService.getMeetingStatusListener().subscribe(status => {
            this.status = status;
        });
        // window.addEventListener(
        //     "message",
        //     event => {
        //         // console.log(event);
        //     },
        //     false,
        // );
    }

    onResize(): void {
        this.app.refreshBounds();
    }
}
