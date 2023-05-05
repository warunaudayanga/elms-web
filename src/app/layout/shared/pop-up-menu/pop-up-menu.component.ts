import { Component, HostListener, Input } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";

@Component({
    selector: "app-pop-up-menu",
    templateUrl: "./pop-up-menu.component.html",
    styleUrls: ["./pop-up-menu.component.scss"],
})
export class PopUpMenuComponent {
    @Input() avatar?: string;

    @Input() items: MenuItem[] = [];

    opened: boolean = false;

    constructor() {}

    @HostListener("document:click", ["$event"])
    onClick(e: MouseEvent): void {
        if (!(e.target as HTMLElement).closest(".menu")) {
            this.opened = false;
        }
    }

    toggleMenu(): void {
        this.opened = !this.opened;
    }
}
