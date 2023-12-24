import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../dialog/interfaces";
import { AppService } from "../../../../../app.service";

@Component({
    selector: "app-payment-info-dialog",
    templateUrl: "./payment-dialog.component.html",
    styleUrls: ["./payment-dialog.component.scss"],
})
export class PaymentDialogComponent implements OnInit {
    loading: boolean = false;

    paying: boolean = false;

    paymentSuccess: boolean = false;

    constructor(
        private readonly dialogRef: MatDialogRef<PaymentDialogComponent, string>,
        private readonly app: AppService,
        private readonly fb: FormBuilder,
    ) {}

    ngOnInit(): void {}

    close(): void {
        this.dialogRef.close();
    }

    pay(): void {
        // this.paymentSuccess = true;
        // this.paying = true;
        // this.stripeService
        //     .confirmPayment({
        //         elements: this.paymentElement.elements!,
        //         redirect: "if_required",
        //     })
        //     .subscribe({
        //         next: result => {
        //             this.paying = false;
        //             if (result.error) {
        //                 this.app.error(result.error.message ?? "Something went wrong!");
        //             } else if (result.paymentIntent.status === "succeeded") {
        //                 this.paymentSuccess = true;
        //                 this.paymentIntent = result.paymentIntent;
        //             } else {
        //                 this.app.error("Something went wrong!");
        //             }
        //         },
        //         error: (err: HttpError) => {
        //             this.paying = false;
        //             this.app.error(err.error?.message ?? "Something went wrong!");
        //         },
        //     });
    }

    ok(): void {
        // this.dialogRef.close(this.paymentIntent!.id);
        this.dialogRef.close();
    }
}
