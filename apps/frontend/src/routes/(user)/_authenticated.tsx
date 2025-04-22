import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
