import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SafePipe } from "./pipes/safe.pipe";
import { FirstCasePipe, TitleCasePipe } from "./pipes/string.pipes";
import { TimeFormatPipe } from "./pipes/date-time.pipes";

@NgModule({
    declarations: [SafePipe, TitleCasePipe, FirstCasePipe, TimeFormatPipe],
    imports: [CommonModule],
    exports: [SafePipe, TitleCasePipe, FirstCasePipe, TimeFormatPipe],
})
export class PipeModule {}
