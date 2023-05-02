import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertData } from "../../interfaces";
import { getIconAndColor } from "../../utils";

@Component({
    selector: "app-alert-dialog",
    templateUrl: "./alert-dialog.component.html",
    styleUrls: ["../common.scss", "./alert-dialog.component.scss"],
})
export class AlertDialogComponent {
    @Output() emitter: EventEmitter<boolean> = new EventEmitter();

    public style: { icon: string; colorClass: string };

    constructor(
        @Inject(MAT_DIALOG_DATA) public alertData: AlertData,
        private readonly dialogRef: MatDialogRef<boolean>,
    ) {
        this.style = getIconAndColor(alertData);
    }

    confirm(): void {
        this.dialogRef.close(true);
    }

    close(): void {
        this.dialogRef.close(!this.alertData.confirm);
    }
}
