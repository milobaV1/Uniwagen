//import { Header } from "@/components/header/header";
import { ListingCard } from "@/components/listing/listing-card";
import { Sidebar } from "@/components/sidebar/sidebar";
import LandingHome from "@/modules/users/features/home/landing-home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <ListingCard />
    </div>
  );
}
