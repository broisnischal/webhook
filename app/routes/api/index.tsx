import { combineHeaders } from "#app/utils/misc.js";
import { data } from "react-router";
import type { Route } from "../+types";

export async function action({ request }: Route.ActionArgs) {

    return data({

    }, {
        headers: combineHeaders(request.headers)
    })

}
