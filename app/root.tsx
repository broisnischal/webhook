import "#app/tailwind.css";
import { data, Links, Meta, Outlet, Scripts } from "react-router";
import type { Route } from "./+types/root";
import { useToast } from "./components/toast";
import { EpicToaster } from "./components/ui/sonner";
import { combineHeaders } from "./utils/misc";
import { getToast } from "./utils/toast.server";


export async function loader({ request }: Route.LoaderArgs) {

  const { toast, headers: toastHeaders } = await getToast(request)

  return data({
    toast,
  }, {
    headers: combineHeaders(
      toastHeaders
    )
  })
}

export default function App({ loaderData }: Route.ComponentProps) {
  useToast(loaderData.toast);

  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <EpicToaster closeButton position="bottom-right" />

        <Scripts />

      </body>
    </html>
  );
}
