import { UserSignUp } from "@/modules/users/features/auth/sign-up/sign-up";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_layout/(auth)/sign-up")({
  component: UserSignUp,
});

function RouteComponent() {
  return <div>Hello "/(user)/_layout/(auth)/sign-up"!</div>;
}
