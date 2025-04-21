import { createFileRoute } from "@tanstack/react-router";
import Home from "../../modules/users/features/home/home";
import { UserLogin } from "@/modules/users/features/auth/login/login";
import { UserSignUp } from "@/modules/users/features/auth/sign-up/sign-up";

export const Route = createFileRoute("/(user)/_layout")({
  component: UserSignUp,
});

function RouteComponent() {
  return <div>Hello "/(user)/_layout"!</div>;
}
