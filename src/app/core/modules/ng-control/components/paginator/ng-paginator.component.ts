import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { PaginatorInterfaces } from "../../../shared/interfaces/paginator.interfaces";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-paginator",
    templateUrl: "./ng-paginator.component.html",
    styleUrls: ["./ng-paginator.component.scss"],
})
export class NgPaginatorComponent implements OnInit, OnChanges {
    @Input() totalRecords: number = 50;

    @Input() limit: number = 5;

    @Input() page: number = 1;

    @Input() pageLimit: number = 5;

    @Input() loading: boolean = false;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onPageChange: EventEmitter<PaginatorInterfaces> = new EventEmitter<PaginatorInterfaces>();

    public visiblePages: number[] = [];

    constructor() {}

    ngOnInit(): void {
        this.updateVisiblePages();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["totalRecords"]) {
            this.totalRecords = changes["totalRecords"].currentValue;
            this.updateVisiblePages();
        }
        if (changes["rows"]) {
            this.limit = changes["rows"].currentValue;
            this.updateVisiblePages();
        }
        if (changes["page"]) {
            this.page = changes["page"].currentValue;
            this.updateVisiblePages();
        }
        if (changes["pageLimit"]) {
            this.pageLimit = changes["pageLimit"].currentValue;
            this.updateVisiblePages();
        }
    }

    getPageCount(): number {
        return Math.ceil(this.totalRecords / this.limit);
    }

    public selectPage(page: number): void {
        if (page !== this.page && page > 0 && page <= this.getPageCount()) {
            this.page = page;
            this.onPageChange.emit({
                page,
                first: this.limit * (page - 1),
                rows: this.limit,
                pageCount: this.getPageCount(),
            });
            this.updateVisiblePages();
        }
    }

    private updateVisiblePages(): void {
        const totalPages = this.getPageCount();
        const length = Math.min(totalPages, this.pageLimit);
        const startIndex = Math.max(Math.min(this.page - Math.ceil(length / 2), totalPages - length), 0);
        this.visiblePages = Array.from(new Array(length).keys(), item => item + startIndex);
    }
}
