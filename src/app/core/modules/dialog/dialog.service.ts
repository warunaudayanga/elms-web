import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AlertOptions, DialogButtons, DialogConfig } from "./interfaces";
import { DialogLevel } from "./enums";
import { AlertDialogComponent } from "./components";
import { ComponentType } from "@angular/cdk/portal";
import { StripePayment } from "../../interfaces/stripe.interfaces";
import { PaymentDialogComponent } from "../shared/components/payment-dialog/payment-dialog.component";

@Injectable({
    providedIn: "root",
})
export class DialogService {
    public alertWidth = "450px";

    private alertClass = "dialog-container";

    constructor(public readonly dialog: MatDialog) {}

    public alert(options: AlertOptions): Observable<boolean> {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: options.width || this.alertWidth,
            disableClose: options.confirm,
            data: options,
            panelClass: [this.alertClass, options.level ?? "primary"],
        });
        return dialogRef.afterClosed();
    }

    public confirm(message: string, buttons?: DialogButtons, level: DialogLevel = DialogLevel.WARNING): Observable<boolean> {
        return this.alert({ title: "Confirm", message, level, confirm: true, buttons });
    }

    public payment<R, D = any>(stripePayment: StripePayment<D>): Observable<R | undefined> {
        const dialogRef = this.dialog.open(PaymentDialogComponent, {
            data: { data: stripePayment },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        return dialogRef.afterClosed();
    }

    public open<R, D = any, T = any>(component: ComponentType<T>, config?: MatDialogConfig<DialogConfig<D>>): Observable<R | undefined> {
        let matDialogRef = this.dialog.open(component, config);
        return matDialogRef.afterClosed();
    }

    public info(message: string, confirm?: boolean): Observable<boolean> {
        return this.alert({ title: "Information", message, level: DialogLevel.INFO, confirm });
    }

    public success(message: string, confirm?: boolean): Observable<boolean> {
        return this.alert({ title: "Success", message, level: DialogLevel.SUCCESS, confirm });
    }

    public warning(message: string, confirm?: boolean): Observable<boolean> {
        return this.alert({ title: "Warning", message, level: DialogLevel.WARNING, confirm });
    }

    public error(message: string, confirm?: boolean): Observable<boolean> {
        return this.alert({ title: "Error", message, level: DialogLevel.ERROR, confirm });
    }

    // noinspection JSUnusedGlobalSymbols
    public sampleAlert(): void {
        this.success("Successfully done nothing");
    }

    // noinspection JSUnusedGlobalSymbols
    public sampleConfirm(): void {
        this.error("Is it successful?", true);
    }
}
