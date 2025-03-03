import { layout, prefix, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    {
        path: "/",
        file: "routes/index.tsx",
    },

    ...prefix("auth", [
        layout("routes/auth/layout.tsx", [
            route(":provider/callback", "routes/auth/provider-callback.tsx"),
            route("login", "routes/auth/login.tsx"),
            // route("verify", "routes/auth/verify.tsx"),
        ]),
        route("logout", "routes/auth/logout.tsx"),
    ]),

    ...prefix("api", [
        route('/', "routes/api/index.tsx"),
        route("webhooks/stripe", "routes/api/webhook.tsx"),
        route("webhooks/github", "routes/api/webhook.github.tsx"),
        route("webhooks/custom", "routes/api/custom-webhook.tsx"),
    ]),

    route("shop", "routes/shop.tsx"),
    route("custom", "routes/custom.tsx"),
] satisfies RouteConfig;
