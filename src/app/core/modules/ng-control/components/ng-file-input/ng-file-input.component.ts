import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf } from "@angular/core";
import { AbstractControl, ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { NgFormControl } from "../../abstract-form-controll";
import { PreviewData } from "../../interfaces/ng-file-input.interfaces";
import { isArray } from "ngx-bootstrap/chronos";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-file-input",
    templateUrl: "./ng-file-input.component.html",
    styleUrls: ["./ng-file-input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgFileInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgFileInputComponent),
        },
    ],
})
export class NgFileInputComponent extends NgFormControl<File[] | File> implements OnInit {
    @Input() label?: string;

    @Input() description?: string;

    @Input() size?: "sm" | "md" | "lg" = "md";

    @Input() formControlName!: string;

    @Input() styleClass?: string;

    @Input() inputClass?: string;

    @Input() multiple?: boolean | "";

    @Input() accept?: string;

    @Input() disabled: boolean = false;

    @Input() noValidation: "" | undefined;

    grabbing: boolean = false;

    previewData?: PreviewData[];

    @Output() valueChange: EventEmitter<File[] | File | null> = new EventEmitter<File[] | File | null>();

    constructor(
        @Optional()
        @Host()
        @SkipSelf()
        protected override controlContainer?: ControlContainer,
    ) {
        super(controlContainer);
    }

    ngOnInit(): void {
        this.init();
    }

    fileToUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event: any): void => {
                resolve(event.target.result);
            };
            reader.onerror = (error): void => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

    async onFilesSelect(e: Event): Promise<void> {
        await this.handleFileSelect(Array.from((e.target as HTMLInputElement).files ?? []));
    }

    async handleFileSelect(selectedFiles: File[]): Promise<void> {
        let files = selectedFiles;
        if (this.accept) {
            files = files.filter(file => {
                return file.type.match(new RegExp(this.accept!));
            });
        }
        if (this.multiple || this.multiple === "") {
            for await (const file of files) {
                const exist = (this.value as File[] | undefined)?.find(f => f.name === file.name && f.size === file.size && f.type === file.type);
                if (!exist) {
                    const previewData: PreviewData = {
                        id: this.previewData?.length ?? 0,
                        file,
                        url: file.type.match(/image\//) ? await this.fileToUrl(file) : undefined,
                    };
                    if ((this.value as File[] | undefined)?.length) {
                        (this.value as File[]).push(file);
                    } else {
                        this.value = [file];
                    }
                    if (this.previewData) {
                        this.previewData.push(previewData);
                    } else {
                        this.previewData = [previewData];
                    }
                }
            }
        } else {
            const file = files[0];
            if (file) {
                const previewData: PreviewData = {
                    id: this.previewData?.length ?? 0,
                    file,
                    url: file.type.match(/image\//) ? await this.fileToUrl(file) : undefined,
                };
                this.value = files?.length ? files[0] : null;
                this.previewData = [previewData];
            } else {
                this.previewData = [];
            }
        }
        this.changed = true;
        this.changeValue(this.value);
        if (!files?.length) this.control?.setErrors({ invalid: true });
    }

    // noinspection JSUnusedLocalSymbols
    onValidation(control: AbstractControl): ValidationErrors | null {
        return !this.required || this.value ? null : { required: true };
    }

    removeFile(pd: PreviewData): void {
        this.previewData = this.previewData?.filter(p => p.id !== pd.id);
        if (isArray(this.value)) {
            this.value = this.value.filter(f => f.name !== pd.file.name && f.size !== pd.file.size && f.type !== pd.file.type);
        } else {
            this.value = null;
        }
        this.changeValue(this.value);
    }

    getFileSize(size: number): string {
        if (size >= 1000000) {
            return Math.ceil(size / 1000000) + " MB";
        } else if (size >= 1000) {
            return Math.ceil(size / 1000) + " KB";
        }
        return Math.ceil(size) + " B";
    }

    getExt(name: string): string {
        return name.split(".").pop() ?? "";
    }

    onDragOver(e: DragEvent): void {
        e.preventDefault();
        if (e.dataTransfer?.files) {
            this.grabbing = true;
        }
    }

    async onDrop(e: DragEvent): Promise<void> {
        e.preventDefault();
        this.grabbing = false;
        if (e.dataTransfer?.files) await this.handleFileSelect(Array.from(e.dataTransfer?.files));
    }

    onDragLeave(e: DragEvent): void {
        e.preventDefault();
        this.grabbing = false;
    }
}
