// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// noinspection SpellCheckingInspection

const host = "http://localhost:8080";

export const environment = {
    production: false,
    host,
    apiUrl: `${host}/api`,
    socketUrl: `${host}/socket`,
    stripe: {
        publishableKey: "pk_test_51N1asMFRe4gUczhbYtH4nwZYbq0xp54fsmg057vC5cFzerxJLAUu9KIngoXwnfLN7Cn78BVBuXVEwLj9r7gLs8ks00OLVOOkaO",
    },
    zoom: {
        lib: { url: "https://source.zoom.us/2.11.0/lib", dir: "/av" },
        authorizeUrl: "https://zoom.us/oauth/authorize",
        responseType: "code",
        clientId: "5Fupa4dS2mM5hCBQ4OQA",
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
