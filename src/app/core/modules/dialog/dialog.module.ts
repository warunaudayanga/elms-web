import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { AlertDialogComponent } from "./components";
import { MomentModule } from "ngx-moment";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
    declarations: [AlertDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        NgSelectModule,
        MomentModule,
        MatSlideToggleModule,
    ],
})
export class DialogModule {}
