import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const renderDevtools = false;

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {renderDevtools && <TanStackRouterDevtools />}
    </>
  )
});
