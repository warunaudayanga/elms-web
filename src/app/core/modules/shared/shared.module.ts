import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { SlideComponent } from "./components/carousel/slide/slide.component";
import { RouterModule } from "@angular/router";
import { NgDataViewComponent } from "../ng-control/components/ng-data-view/ng-data-view.component";
import { ClassCardComponent } from "../../../system/shared/components/class-card/class-card.component";
import { NgControlModule } from "../ng-control";
import { PipeModule } from "../pipe/pipe.module";
import { MyClassCardComponent } from "../../../system/shared/components/my-class-card/my-class-card.component";
import { PaymentDialogComponent } from "./components/payment-dialog/payment-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxStripeModule } from "ngx-stripe";
import { ChatRoomComponent } from "./components/chat-room/chat-room.component";
import { MatButtonModule } from "@angular/material/button";
import { MomentModule } from "ngx-moment";
import { AssessmentComponent } from "../../../system/shared/components/assessment/assessment.component";
import { QzComponent } from "../../../system/shared/components/assessment/qz/qz.component";
import { QzListComponent } from "../../../system/shared/components/assessment/qz-list/qz-list.component";

@NgModule({
    declarations: [
        PageNotFoundComponent,
        CarouselComponent,
        NgDataViewComponent,
        SlideComponent,
        ClassCardComponent,
        MyClassCardComponent,
        PaymentDialogComponent,
        ChatRoomComponent,
        AssessmentComponent,
        QzComponent,
        QzListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipeModule,
        NgControlModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        NgxStripeModule,
        MatButtonModule,
        MomentModule,
        FormsModule,
    ],
    exports: [
        PageNotFoundComponent,
        CarouselComponent,
        NgDataViewComponent,
        SlideComponent,
        ClassCardComponent,
        MyClassCardComponent,
        ChatRoomComponent,
    ],
})
export class SharedModule {}
