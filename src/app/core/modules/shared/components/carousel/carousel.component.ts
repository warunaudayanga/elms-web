import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
} from "@angular/core";
import { SlideComponent } from "./slide/slide.component";

export interface Slide {
    heading: string;
    text: string;
}

@Component({
    selector: "app-carousel",
    templateUrl: "./carousel.component.html",
    styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit, AfterContentInit, AfterViewInit {
    @Input() controlSide: "left" | "center" | "right" = "left";

    @Input() showSideControls: boolean = true;

    @Input() interval: number = 4000;

    @Input() activeIndex: number = 0;

    @Input() autoSwitch: boolean = true;

    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(SlideComponent, { read: ElementRef }) slides!: QueryList<ElementRef<HTMLElement>>;

    timer?: NodeJS.Timeout;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.restartTimer();
    }

    restartTimer(): void {
        clearTimeout(this.timer);
        if (this.autoSwitch && this.slides?.length > 1) {
            this.timer = setInterval(() => {
                this.setActive((this.activeIndex + 1) % this.slides.length, true);
            }, this.interval);
        }
    }

    ngAfterContentInit(): void {
        this.setActive(this.activeIndex);
    }

    ngAfterViewInit(): void {
        const el = this.elementRef.nativeElement as HTMLElement;
        const slides = el.querySelectorAll("app-slide .slide-content") as NodeListOf<HTMLElement>;
        let height: number = 0;
        slides.forEach(slide => {
            height = Math.max(height, slide.scrollHeight);
        });
        (el.querySelector(".slides") as HTMLElement)!.style.minHeight = `${height}px`;
    }

    setActive(index: number, auto?: boolean): void {
        const lastIndex = this.activeIndex;
        this.activeIndex = index;
        this.activeIndexChange.emit(index);
        this.slides.forEach(slide => {
            slide.nativeElement.className = "";
        });
        const slide = this.slides.get(index)!.nativeElement;
        if (auto || lastIndex < index) {
            slide.className = "active";
            if (slide.previousElementSibling) {
                slide.previousElementSibling!.className = "previous";
            } else {
                slide.parentElement!.lastElementChild!.className = "previous";
            }
        } else if (lastIndex > index) {
            slide.className = "active reverse";
            if (slide.nextElementSibling) {
                slide.nextElementSibling!.className = "next";
            } else {
                slide.parentElement!.firstElementChild!.className = "next";
            }
        } else {
            slide.className = "active";
        }
        this.restartTimer();
    }

    prev(): void {
        if (this.activeIndex > 0) {
            this.setActive((this.activeIndex - 1) % this.slides.length);
        }
    }

    next(): void {
        if (this.activeIndex < this.slides.length - 1) {
            this.setActive((this.activeIndex + 1) % this.slides.length);
        }
    }
}
