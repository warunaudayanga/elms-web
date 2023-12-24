/* eslint-disable camelcase */
import { Component } from "@angular/core";
import { AppService } from "./app.service";
import { ZoomService } from "./core/services/elms/zoom.service";
import { Subscription } from "rxjs";
import { Store } from "@ngxs/store";
import { SocketService } from "./core/services/socket.service";
import { ConfigService } from "./core/services/config.service";
import { PayhereService } from "./core/services/payhere.service";
import { PayherePayment } from "./payhere";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    status: boolean = false;

    meetingStatusSub: Subscription;

    constructor(
        public readonly app: AppService,
        private readonly configService: ConfigService,
        private readonly store: Store,
        private readonly socketService: SocketService,
        private readonly zoomService: ZoomService,
        private readonly payhereService: PayhereService,
    ) {
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

        this.payTest();
    }

    payTest(): void {
        const payment: PayherePayment = {
            sandbox: true,
            // eslint-disable-next-line camelcase
            merchant_id: "1225341",
            return_url: "https://webhook.site/64b68e7c-ce36-4bf9-a231-5e9a8aab9a40", // Important
            cancel_url: "https://webhook.site/64b68e7c-ce36-4bf9-a231-5e9a8aab9a40", // Important
            notify_url: "https://webhook.site/64b68e7c-ce36-4bf9-a231-5e9a8aab9a40",
            order_id: "ItemNo12345",
            items: "Door bell wireles",
            amount: "1000.00",
            currency: "LKR",
            hash: "",
            first_name: "Saman",
            last_name: "Perera",
            email: "samanp@gmail.com",
            phone: "0771234567",
            address: "No.1, Galle Road",
            city: "Colombo",
            country: "Sri Lanka",
            delivery_address: "No. 46, Galle road, Kalutara South",
            delivery_city: "Kalutara",
            delivery_country: "Sri Lanka",
            custom_1: "",
            custom_2: "",
        };

        payment.hash = this.payhereService.generateHash(payment);

        console.log(this.payhereService.startPayment(payment));
    }

    onResize(): void {
        this.app.refreshBounds();
    }
}
