export interface Configuration {
    host: string;
    apiUrl: string;
    socketUrl: string;
    stripe: {
        publishableKey: string;
    };
    zoom: {
        lib: { url: string; dir: string };
        authorizeUrl: string;
        responseType: string;
        clientId: string;
    };
}
