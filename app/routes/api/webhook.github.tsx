import type { Route } from "./+types/webhook.github";


export async function action({
    context, request
}: Route.ActionArgs) {

    console.log("webhook received!")


    // Still return 200 OK to GitHub
    return new Response(null, {
        status: 200,
    })
}