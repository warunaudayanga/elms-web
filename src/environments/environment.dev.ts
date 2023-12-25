export const environment = {
    production: false,
    host: "https://elms-95g1.onrender.com",
    payhere: {
        sandbox: true,
        currency: "LKR",
        merchantId: "1225341",
        notifyUrl: "https://elms-95g1.onrender.com/api/payment/notify",
        returnUrl: "https://elms-95g1.onrender.com/api/payment/return",
        cancelUrl: "https://elms-95g1.onrender.com/api/payment/cancel",
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
