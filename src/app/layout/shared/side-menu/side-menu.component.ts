import { AfterContentInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { MenuItem } from "../../../core/interfaces/menu.interface";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements AfterContentInit {
    @Input() items: MenuItem[] = [];

    @Input() activeIndex: number = 0;

    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

    private url: string = "";

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
                if (this.url === "/student") this.url = "/student/my-classes";
                this.items.find((item, index) => {
                    return item.routerLink === this.url && this.activate(index);
                });
            }
        });
    }

    ngAfterContentInit(): void {
        this.items.find((item, index) => {
            return item.routerLink === this.url && this.activate(index);
        });
    }

    activate(index: number): void {
        this.activeIndex = index;
        this.activeIndexChange.emit(index);
    }

    onClick(e: MouseEvent, index: number, item: MenuItem): void {
        item.action?.(e);
        this.activate(index);
    }
}
