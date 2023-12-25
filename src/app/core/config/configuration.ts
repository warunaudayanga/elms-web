import { ConfigService } from "../services/config.service";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const configurations = (env: any) => {
    return {
        host: env?.host || "",
        apiUrl: `${env?.host || ""}/api`,
        socketUrl: `${env?.host || ""}/socket`,
        payhere: {
            sandbox: env?.payhere?.sandbox || false,
            currency: env?.payhere?.currency || "LKR",
            merchantId: env?.payhere?.merchantId || "",
            notifyUrl: env?.payhere?.notifyUrl || "",
            returnUrl: env?.payhere?.returnUrl || "",
            cancelUrl: env?.payhere?.cancelUrl || "",
            country: env?.payhere?.country || "Sri Lanka",
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
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => configurations(ConfigService.env);

// noinspection JSUnusedGlobalSymbols
export const asyncConfiguration = async (): Promise<any> => {
    return configurations(await ConfigService.asyncEnv);
};
