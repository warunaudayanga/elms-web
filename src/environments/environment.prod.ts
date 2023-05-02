const host = "https://api.learn-online.live";

export const environment = {
    production: false,
    host,
    apiUrl: `${host}`,
    socketUrl: `${host}/socket`,
    stripe: {
        publishableKey:
            "pk_test_51N1asMFRe4gUczhbYtH4nwZYbq0xp54fsmg057vC5cFzerxJLAUu9KIngoXwnfLN7Cn78BVBuXVEwLj9r7gLs8ks00OLVOOkaO",
    },
    zoom: {
        lib: { url: "https://source.zoom.us/2.11.0/lib", dir: "/av" },
        authorizeUrl: "https://zoom.us/oauth/authorize",
        responseType: "code",
        clientId: "5Fupa4dS2mM5hCBQ4OQA",
    },
};
