import { ConfigService } from "../services/config.service";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const configurations = (env: any) => {
    return {
        host: env?.host || "",
        apiUrl: `${env?.host || ""}/api`,
        socketUrl: `${env?.host || ""}/socket`,
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
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => configurations(ConfigService.env);

// noinspection JSUnusedGlobalSymbols
export const asyncConfiguration = async (): Promise<any> => {
    return configurations(await ConfigService.asyncEnv);
};
