import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { StripePaymentElementComponent, StripeService } from "ngx-stripe";
import { PaymentIntent, StripeElementsOptions } from "@stripe/stripe-js";
import { FormBuilder } from "@angular/forms";
import { StripeHttpService } from "../../../../services/elms/stripe.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../dialog/interfaces";
import { AppService } from "../../../../../app.service";
import { HttpError } from "../../../../interfaces";
import { StripePayment } from "../../../../interfaces/stripe.interfaces";

@Component({
    selector: "app-payment-info-dialog",
    templateUrl: "./payment-dialog.component.html",
    styleUrls: ["./payment-dialog.component.scss"],
})
export class PaymentDialogComponent implements OnInit {
    @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;

    loading: boolean = false;

    paying: boolean = false;

    paymentSuccess: boolean = false;

    paymentIntent?: PaymentIntent;

    elementsOptions: StripeElementsOptions = {
        locale: "en",
    };

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public config: DialogConfig<StripePayment>,
        private readonly dialogRef: MatDialogRef<PaymentDialogComponent, string>,
        private readonly app: AppService,
        private readonly fb: FormBuilder,
        private readonly stripeService: StripeService,
        private readonly stripeHttpService: StripeHttpService,
    ) {}

    ngOnInit(): void {
        if (this.config.data?.amount) {
            this.loading = true;
            this.stripeHttpService.createPaymentIntent(this.config.data.amount, this.config.data.metadata).subscribe(pi => {
                this.elementsOptions.clientSecret = pi.client_secret!;
                this.loading = false;
            });
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    pay(): void {
        this.paying = true;
        this.stripeService
            .confirmPayment({
                elements: this.paymentElement.elements!,
                confirmParams: {
                    // payment_method_data: {
                    //     billing_details: {
                    //         name: this.paymentElementForm.value.name!,
                    //         email: this.paymentElementForm.value.email!,
                    //         address: {
                    //             line1: this.paymentElementForm.value.address || "",
                    //             postal_code: this.paymentElementForm.value.zipcode || "",
                    //             city: this.paymentElementForm.value.city || "",
                    //         },
                    //     },
                    // },
                },
                redirect: "if_required",
            })
            .subscribe({
                next: result => {
                    this.paying = false;
                    if (result.error) {
                        this.app.error(result.error.message ?? "Something went wrong!");
                    } else if (result.paymentIntent.status === "succeeded") {
                        this.paymentSuccess = true;
                        this.paymentIntent = result.paymentIntent;
                    } else {
                        this.app.error("Something went wrong!");
                    }
                },
                error: (err: HttpError) => {
                    this.paying = false;
                    this.app.error(err.error?.message ?? "Something went wrong!");
                },
            });
    }

    ok(): void {
        this.dialogRef.close(this.paymentIntent!.id);
    }
}
