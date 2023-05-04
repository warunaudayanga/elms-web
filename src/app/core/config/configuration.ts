import { ConfigService } from "../services/config.service";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
    host: ConfigService?.env?.host || "http://localhost:8080",
    apiUrl: `${ConfigService?.env?.host || "http://localhost:8080"}/api`,
    socketUrl: `${ConfigService?.env?.host || "http://localhost:8080"}/socket`,
    stripe: {
        publishableKey: ConfigService?.env?.stripe?.publishableKey || "",
    },
    zoom: {
        authorizeUrl: ConfigService?.env?.zoom?.authorizeUrl || "",
        clientId: ConfigService?.env?.zoom?.clientId || "",
        lib: {
            dir: ConfigService?.env?.zoom?.lib?.dir || "",
            url: ConfigService?.env?.zoom?.lib?.url || "",
        },
        responseType: ConfigService?.env?.zoom?.responseType || "",
    },
});
