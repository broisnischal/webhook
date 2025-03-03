import crypto from "node:crypto";
export async function hashPayload(data: any, secret: string) {
    return crypto.createHmac("sha256", secret).update(JSON.stringify(data)).digest("hex");
}

export async function decodeHash(hash: string, secret: string) {
    return crypto.createHmac("sha256", secret).update(hash).digest("hex");
}