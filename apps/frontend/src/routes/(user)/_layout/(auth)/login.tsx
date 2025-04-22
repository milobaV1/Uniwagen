import { UserLogin } from "@/modules/users/features/auth/login/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_layout/(auth)/login")({
  component: UserLogin,
});

function RouteComponent() {
  return <div>Hello "/(user)/_layout/(auth)/login"!</div>;
}
