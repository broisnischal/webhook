import type { OAuth2Tokens } from "arctic";
import { OAuth2Strategy, UnexpectedResponseError } from "remix-auth-oauth2";

export const figmaStrategy = new OAuth2Strategy(
    {
        clientId: process.env.FIGMA_CLIENT_ID!,
        clientSecret: process.env.FIGMA_CLIENT_SECRET!,
        cookie: {
            name: "auth",
            // sameSite: "None",
            path: "/",
            // httpOnly: true,
            // secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            maxAge: 1000 * 60 * 60 * 24 * 30,
            // secure: process.env.NODE_ENV === "production", // Ensures cookies are secure in production
        },
        authorizationEndpoint: "https://www.figma.com/oauth",
        // tokenEndpoint: "https://www.figma.com/api/oauth/token", // Correct token endpoint
        tokenEndpoint: "https://api.figma.com/v1/oauth/token",
        redirectURI: "http://localhost:5173/auth/figma/callback", // Use env for flexibility
        scopes: ["files:read", "file_variables:read"],
        tokenRevocationEndpoint: "https://www.figma.com/api/oauth/revoke", // Add token revocation endpoint
        // https://api.figma.com/v1/oauth/refresh
    },
    async (params) => {
        try {
            return params.tokens;
        } catch (error) {
            console.error("Error in OAuth callback:", error);
            throw new Error("Failed to process OAuth tokens");
        }
    }
);
