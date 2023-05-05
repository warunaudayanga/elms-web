import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControlDirective, FormDirective } from "./directives";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgInputComponent } from "./components/ng-input/ng-input.component";
import { NgTagInputComponent } from "./components/ng-tag-input/ng-tag-input.component";
import { NgFileInputComponent } from "./components/ng-file-input/ng-file-input.component";
import { NgDropdownComponent } from "./components/ng-dropdown/ng-dropdown.component";
import { NgSwitchComponent } from "./components/ng-switch/ng-switch.component";
import { NgButtonComponent } from "./components/ng-button/ng-button.component";
import { NgSpinnerComponent } from "./components/ng-spinner/ng-spinner.component";
import { NgSelectBoxComponent } from "./components/ng-select-box/ng-select-box.component";
import { PipeModule } from "../pipe/pipe.module";
import { InputDirective } from "./directives/input.directive";
import { NgSectionComponent } from "./components/ng-section/ng-section.component";
import { NgErrorComponent } from "./components/ng-error/ng-error.component";
import { NgSectionContentDirective } from "./directives/ng-section/ng-section-content.directive";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { NgPaginatorComponent } from "./components/paginator/ng-paginator.component";
import { NgDateComponent } from "./components/ng-date/ng-date.component";

@NgModule({
    declarations: [
        FormDirective,
        FormControlDirective,
        NgInputComponent,
        NgTagInputComponent,
        NgFileInputComponent,
        NgDropdownComponent,
        NgSwitchComponent,
        NgButtonComponent,
        NgSpinnerComponent,
        NgSelectBoxComponent,
        InputDirective,
        NgSectionComponent,
        NgSectionContentDirective,
        NgErrorComponent,
        NgErrorComponent,
        NgPaginatorComponent,
        NgDateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatSlideToggleModule,
        BsDatepickerModule,
        FormsModule,
        MatDatepickerModule,
        PipeModule,
        TimepickerModule,
    ],
    exports: [
        FormDirective,
        FormControlDirective,
        NgInputComponent,
        NgTagInputComponent,
        NgFileInputComponent,
        NgDropdownComponent,
        NgSwitchComponent,
        NgButtonComponent,
        NgSelectBoxComponent,
        NgSpinnerComponent,
        NgSectionComponent,
        NgSectionContentDirective,
        NgErrorComponent,
        NgErrorComponent,
        NgPaginatorComponent,
        NgDateComponent,
    ],
})
export class NgControlModule {}
