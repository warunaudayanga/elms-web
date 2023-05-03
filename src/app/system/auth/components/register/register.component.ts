import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services";
import { AppService } from "../../../../app.service";
import { HttpError } from "../../../../core/interfaces";
import { matched } from "../../../../core/validators/validators";
import { Area, GuardianRelationship } from "../../../../core/entity";
import { CommonService } from "../../../../core/services/elms/common.service";
import { enumToKeyValue, toTitleCase } from "../../../../core/utils";
import { KeyValue } from "../../../../core/interfaces/util.interfaces";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
    registerForm?: FormGroup;

    areas: Area[] = [];

    guardianRelationships: KeyValue[] = enumToKeyValue(GuardianRelationship, toTitleCase);

    loading: boolean = false;

    constructor(private readonly app: AppService, private fb: FormBuilder, private authService: AuthService, private areaService: CommonService) {}

    ngOnInit(): void {
        this.getAreas();
        this.registerForm = this.fb.group(
            {
                firstName: ["", [Validators.required]],
                lastName: ["", [Validators.required]],
                username: ["", [Validators.required]],
                password: ["", [Validators.required]],
                confirm: ["", [Validators.required]],
                email: ["", [Validators.required]],
                dob: ["", [Validators.required]],
                phone: ["", [Validators.required]],
                areaId: ["", [Validators.required]],
                address: ["", [Validators.required]],
                guardianRelationship: ["", [Validators.required]],
                guardianName: ["", [Validators.required]],
                guardianPhone: ["", [Validators.required]],
                guardianAddress: ["", [Validators.required]],
                school: [""],
            },
            {
                validators: matched("password", "confirm"),
            },
        );
        // this.registerForm.patchValue({
        //     firstName: "John",
        //     lastName: "Doe",
        //     username: "johndoe@example.com",
        //     password: "myPassword",
        //     confirm: "myPassword",
        //     email: "johndoe@example.com",
        //     dob: "1990-01-01",
        //     phone: "1234567890",
        //     areaId: 17,
        //     address: "123 Main Street",
        //     guardianRelationship: GuardianRelationship.Father,
        //     guardianName: "Jane Doe",
        //     guardianPhone: "0987654321",
        //     guardianAddress: "456 Oak Avenue",
        //     school: "ABC School",
        // });
    }

    getAreas(): void {
        this.areaService.getAreas().subscribe({
            next: areas => {
                this.areas = areas;
            },
            error: (err: HttpError) => {
                this.app.error(err.error?.message ?? "Error occurred!");
            },
        });
    }

    register(): void {
        if (this.registerForm?.valid) {
            this.loading = true;
            this.authService.register(this.registerForm!.value).subscribe({
                next: () => {
                    this.loading = false;
                    this.app.success("Student registered successfully.");
                    this.app.load("/"); // TODO: a dialog would be better
                },
                error: (err: HttpError) => {
                    this.loading = false;
                    this.app.error(err.error?.message ?? "Something went wrong!");
                },
            });
        }
    }
}
