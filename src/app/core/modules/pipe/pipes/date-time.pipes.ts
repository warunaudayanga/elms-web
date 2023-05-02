import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

@Pipe({
    name: "time",
})
export class TimeFormatPipe implements PipeTransform {
    public transform(value?: string, format?: string): string {
        if (!value) {
            return "";
        }
        const time = moment(value, "HH:mm:ss");
        return time.format(format ?? "hh:mm a");
    }
}
