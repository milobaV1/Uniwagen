import { Header } from "@/components/header/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_authenticated/(home)/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
}
