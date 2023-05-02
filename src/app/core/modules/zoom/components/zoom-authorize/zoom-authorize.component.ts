import { Component, OnDestroy, OnInit } from "@angular/core";
import { ZoomState } from "../../../../store/zoom/zoom.state";
import { SetAuthorized, SetPreviousRoute } from "../../../../store/zoom/zoom.action";
import { HttpError } from "../../../../interfaces";
import { AppService } from "../../../../../app.service";
import { Store } from "@ngxs/store";
import { ActivatedRoute } from "@angular/router";
import { ZoomService } from "../../../../services/elms/zoom.service";
import { DialogService } from "../../../dialog";
import { environment } from "../../../../../../environments/environment";
import { DialogLevel } from "../../../dialog/enums";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "zoom-authorize",
    templateUrl: "./zoom-authorize.component.html",
    styleUrls: ["./zoom-authorize.component.scss"],
})
export class ZoomAuthorizeComponent implements OnInit, OnDestroy {
    zoomAuthorized: boolean = false;

    zoomAuthorizationCode?: string;

    previousRoute?: string;

    constructor(
        private app: AppService,
        private store: Store,
        private route: ActivatedRoute,
        private zoomService: ZoomService,
        private dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.zoomAuthorizationCode = this.route.snapshot.queryParams["code"];
        this.previousRoute = this.store.selectSnapshot(ZoomState.getPreviousRoute);
        this.zoomAuthorized = this.store.selectSnapshot(ZoomState.isAuthorized);

        if (this.zoomAuthorizationCode) {
            this.zoomService.generateToken(this.zoomAuthorizationCode).subscribe({
                next: () => {
                    this.store.dispatch(new SetAuthorized(true));
                    // this.router.navigate(["."], { relativeTo: this.route }).then();
                    this.zoomAuthorized = true;
                    this.store.dispatch(new SetPreviousRoute(undefined));
                    this.app.load(this.previousRoute);
                },
                error: (err: HttpError) => {
                    this.app.error(err.error?.message ?? "Something went wrong!");
                },
            });
        } else if (!this.zoomAuthorized) {
            this.app.error("Zoom is not authorized, Please authorize zoom");
        }
    }

    authorize(): void {
        const res = this.dialogService.confirm(
            "You will be redirected to zoom login if you are not already logged in!",
            { ok: "Authorize Zoom", cancel: "Cancel" },
            DialogLevel.WARNING,
        );
        res.subscribe(doAuthorize => {
            if (doAuthorize) {
                this.store.dispatch(new SetAuthorized(false));
                const { authorizeUrl, responseType, clientId } = environment.zoom;
                const redirectUri = `${window.location.origin}${window.location.pathname}`;
                window.location.href = `${authorizeUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;
            }
        });
    }

    ngOnDestroy(): void {
        this.previousRoute = undefined;
    }
}
