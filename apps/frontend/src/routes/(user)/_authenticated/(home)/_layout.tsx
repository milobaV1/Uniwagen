import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_authenticated/(home)/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-[100vh]">
      <div className="h-[65px]">
        <Header />
      </div>
      <div className="h-[calc(100vh-65px)] w-full">
        <div className="flex h-full gap-20">
          <div className="h-full flex items-center ml-20">
            <Sidebar />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
        {/* <Outlet /> */}
      </div>
    </div>
  );
}
