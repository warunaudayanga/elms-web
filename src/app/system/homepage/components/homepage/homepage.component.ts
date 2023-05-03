import { Component, ElementRef, ViewChild } from "@angular/core";
import { AppService } from "../../../../app.service";
import { NgItem } from "../../../../core/modules/ng-control/interfaces/ng-dropdown.interfaces";

@Component({
    selector: "app-homepage",
    templateUrl: "./homepage.component.html",
    styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent {
    // eslint-disable-next-line prettier/prettier
    @ViewChild("more") more?: ElementRef<HTMLDivElement>;

    showMore: boolean = false;

    scrolledState: "top" | "bottom" | "scrolling" = "top";

    items: NgItem[] = [
        {
            label: "Action 1",
            action: (): void => {
                // Action here
            },
        },
        {
            label: "Action 2",
            action: (): void => {
                // Action here
            },
        },
        {
            label: "Action 3",
            action: (): void => {
                // Action here
            },
        },
    ];

    constructor(public readonly app: AppService) {}

    scroll(container: HTMLDivElement): void {
        container.scrollTo(0, this.app.height + 10);
    }

    onScroll(container: HTMLDivElement): void {
        if (this.scrolledState === "top" && container.scrollTop <= 10) {
            this.scrolledState = "scrolling";
            container.scrollTo(0, this.app.height + 10);
        }

        if (container.scrollTop >= this.app.height) {
            setTimeout(() => {
                this.scrolledState = "bottom";
            }, 10);
        }

        if (this.scrolledState === "bottom" && container.scrollTop >= this.app.height - 10 && container.scrollTop < this.app.height) {
            this.scrolledState = "scrolling";
            container.scrollTo(0, 0);
        }

        if (container.scrollTop === 0) {
            setTimeout(() => {
                this.scrolledState = "top";
            }, 10);
        }

        this.showMore = container.scrollTop >= this.app.height;
    }
}
