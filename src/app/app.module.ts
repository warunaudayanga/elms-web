import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { environment } from "../environments/environment";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsResetPluginModule } from "ngxs-reset-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { AuthState } from "./core/store";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "./system/auth/interceptors";
import { ErrorResponseInterceptor, ResponseInterceptor } from "./core/interceptors";
import { SharedModule } from "./core/modules/shared/shared.module";
import { LayoutModule } from "./layout/layout.module";
import { MatDialogModule } from "@angular/material/dialog";
import { ZoomState } from "./core/store/zoom/zoom.state";
import { ZoomModule } from "./core/modules/zoom/zoom.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { NgControlModule } from "./core/modules/ng-control";
import { PipeModule } from "./core/modules/pipe/pipe.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AssessmentDialogComponent } from "./system/shared/components/assessment/assessment-dialog/assessment-dialog.component";
import { MatDividerModule } from "@angular/material/divider";
import { QuizEditorComponent } from "./system/shared/components/assessment/quiz-editor/quiz-editor.component";
import { QuizState } from "./core/store/quiz/quiz.state";
import { APP_BASE_HREF } from "@angular/common";
import configuration from "./core/config/configuration";
// import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

@NgModule({
    declarations: [AppComponent, AssessmentDialogComponent, QuizEditorComponent],
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RouterOutlet,
        HttpClientModule,
        AppRoutingModule,
        NgxsModule.forRoot([AuthState, ZoomState, QuizState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
        NgxsStoragePluginModule.forRoot(),
        NgxsResetPluginModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        // NgxsLoggerPluginModule.forRoot(),
        LayoutModule,
        MatDialogModule,
        ZoomModule,
        NgControlModule,
        PipeModule,
        MatDividerModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
