import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    static env: any;

    constructor(protected http: HttpClient) {}

    async loadEnvironment(): Promise<void> {
        try {
            ConfigService.env = await firstValueFrom(this.http.get("env.json"));
        } catch (err) {}
    }
}
