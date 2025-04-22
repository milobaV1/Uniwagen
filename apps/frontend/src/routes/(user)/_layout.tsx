import { createFileRoute, Outlet } from "@tanstack/react-router";
//import LandingHome from "../../modules/users/features/home/home";
// import { UserLogin } from "@/modules/users/features/auth/login/login";
// import { UserSignUp } from "@/modules/users/features/auth/sign-up/sign-up";

export const Route = createFileRoute("/(user)/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
