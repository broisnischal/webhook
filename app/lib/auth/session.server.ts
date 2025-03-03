import { createCookieSessionStorage } from "react-router";

export const session = createCookieSessionStorage({
    cookie: {
        name: "figma-auth",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: [process.env.COOKIE_SECRET!],
        secure: process.env.NODE_ENV === "production",
    },
}); 