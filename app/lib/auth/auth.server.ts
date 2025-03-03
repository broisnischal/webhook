
import { Authenticator } from "remix-auth";
import { figmaStrategy } from "./strategies/figma";
import type { OAuth2Tokens } from "arctic";

const authenticator = new Authenticator<OAuth2Tokens>();

authenticator.use(figmaStrategy, "figma");

export { authenticator };