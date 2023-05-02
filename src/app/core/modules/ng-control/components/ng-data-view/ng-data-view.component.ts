import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
    TrackByFunction,
    ViewChild,
} from "@angular/core";

import { PaginatorInterfaces } from "../../../shared/interfaces/paginator.interfaces";
import { DataViewRefreshEvent } from "../../../shared/interfaces/data-view.interfaces";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-data-view",
    templateUrl: "./ng-data-view.component.html",
    styleUrls: ["./ng-data-view.component.scss"],
})
export class NgDataViewComponent implements OnChanges, AfterViewInit {
    @Input() items!: any[];

    @Input() layout: "list" | "grid" = "list";

    @Input() paginator: boolean = true;

    @Input() totalRecords: number = 0;

    @Input() limit: number = 10;

    @Input() pageLimit: number = 5;

    @Input() styleClass?: string;

    @Input() listStyleClass?: string;

    @Input() fit: boolean = false;

    @Input() stickyHeader: boolean = false;

    @Input() loading: boolean = false;

    @Input() error: boolean = false;

    @Input() trackBy: TrackByFunction<any> = (index: number, item: any) => item;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onPageChange: EventEmitter<PaginatorInterfaces> = new EventEmitter<PaginatorInterfaces>();

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onRefresh: EventEmitter<DataViewRefreshEvent> = new EventEmitter<DataViewRefreshEvent>();

    @ContentChild("header") header!: TemplateRef<any>;

    @ContentChild("item") item!: TemplateRef<any>;

    @ViewChild("scrollView") scrollView?: ElementRef<HTMLDivElement>;

    @ViewChild("headerDiv") headerDiv?: ElementRef<HTMLDivElement>;

    page: number = 1;

    headerHeight: number = 0;

    constructor() {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            const elem = this.headerDiv?.nativeElement;
            if (elem) {
                this.headerHeight =
                    elem.clientHeight +
                    Number(getComputedStyle(elem).marginBottom.replace(/\D/g, "")) +
                    Number(getComputedStyle(elem).marginBottom.replace(/\D/g, ""));
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["items"]) {
            this.items = changes["items"].currentValue;
        }
    }

    pageChange(e: PaginatorInterfaces): void {
        this.page = e.page;
        this.onPageChange.emit(e);
        this.scrollView?.nativeElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    refresh(e: MouseEvent): void {
        this.onRefresh.emit({ event: e, page: this.page });
    }
}
