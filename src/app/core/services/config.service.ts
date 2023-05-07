import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Configuration } from "../interfaces";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    static env: any;

    static asyncEnv: Promise<any>;

    constructor(protected http: HttpClient) {}

    async loadEnvironment(): Promise<void> {
        try {
            ConfigService.asyncEnv = firstValueFrom(this.http.get("env.json"));
            // eslint-disable-next-line require-atomic-updates
            ConfigService.env = await ConfigService.asyncEnv;
        } catch (err) {}
    }

    get config(): Configuration {
        return this.mapConfig(ConfigService.env);
    }

    // noinspection JSUnusedGlobalSymbols
    get asyncConfig(): Promise<Configuration> {
        return new Promise(async resolve => {
            if (ConfigService.asyncEnv === undefined) {
                await this.loadEnvironment();
            }
            resolve(ConfigService.asyncEnv.then((env: any) => this.mapConfig(env)));
        });
    }

    mapConfig(env: any): Configuration {
        return {
            host: env?.host || "",
            apiUrl: `${env?.host || ""}/api`,
            socketUrl: `${env?.host || ""}/socket`,
            stripe: {
                publishableKey: env?.stripe?.publishableKey || "",
            },
            zoom: {
                authorizeUrl: env?.zoom?.authorizeUrl || "",
                clientId: env?.zoom?.clientId || "",
                lib: {
                    dir: env?.zoom?.lib?.dir || "",
                    url: env?.zoom?.lib?.url || "",
                },
                responseType: env?.zoom?.responseType || "",
            },
        };
    }
}
