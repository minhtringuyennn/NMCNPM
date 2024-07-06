import UserLayout from "@/components/layout/user";
import TrackingOrders from "@/pages/user/track-orders";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("//tracking")({
  component: Index
});

function Index() {
  return (
    <UserLayout invert={true}>
      <TrackingOrders />
    </UserLayout>
  );
}
