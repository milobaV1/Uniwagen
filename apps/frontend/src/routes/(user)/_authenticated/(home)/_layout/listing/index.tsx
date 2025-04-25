import { ListingPreview } from "@/modules/users/features/listings/listing-preview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(user)/_authenticated/(home)/_layout/listing/"
)({
  component: ListingPreview,
});

function RouteComponent() {
  return <div>Hello "/(user)/_authenticated/(home)/_layout/listing"!</div>;
}
