export interface Configuration {
    host: string;
    apiUrl: string;
    socketUrl: string;
    zoom: {
        lib: { url: string; dir: string };
        authorizeUrl: string;
        responseType: string;
        clientId: string;
    };
}
