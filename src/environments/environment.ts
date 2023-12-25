export const environment = {
    production: false,
    // host: "https://elms-95g1.onrender.com",
    host: "http://localhost:8080",
    payhere: {
        sandbox: true,
        currency: "LKR",
        merchantId: "1225341",
        notifyUrl: "https://2673-2402-4000-b13b-9a2f-7d71-4e42-533d-1e77.ngrok-free.app/api/payment/notify",
        returnUrl: "https://2673-2402-4000-b13b-9a2f-7d71-4e42-533d-1e77.ngrok-free.app/api/payment/return",
        cancelUrl: "https://2673-2402-4000-b13b-9a2f-7d71-4e42-533d-1e77.ngrok-free.app/api/payment/cancel",
        country: "Sri Lanka",
    },
    zoom: {
        lib: {
            url: "https://source.zoom.us/2.11.0/lib",
            dir: "/av",
        },
        authorizeUrl: "https://zoom.us/oauth/authorize",
        responseType: "code",
        clientId: "rk9bktfPRMeKKBxTLn3Law",
    },
};
