import { UserHome } from "@/modules/users/features/home/user-home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(user)/_authenticated/(home)/_layout/home"
)({
  component: UserHome,
});

function RouteComponent() {
  return <div>Hello "/(user)/_authenticated/(home)/_layout/home"!</div>;
}
