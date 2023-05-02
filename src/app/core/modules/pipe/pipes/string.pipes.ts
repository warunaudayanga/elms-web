import { Pipe, PipeTransform } from "@angular/core";
import { toFirstCase, toTitleCase } from "../../../utils";

@Pipe({
    name: "toTitleCase",
})
export class TitleCasePipe implements PipeTransform {
    public transform(value?: string): string {
        return toTitleCase(value);
    }
}

@Pipe({
    name: "toFirstCases",
})
export class FirstCasePipe implements PipeTransform {
    public transform(value?: string): string {
        return toFirstCase(value);
    }
}
