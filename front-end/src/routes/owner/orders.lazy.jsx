import OwnerLayout from "@/components/layout/owner";
import { createLazyFileRoute } from "@tanstack/react-router";
import Orders from "@/pages/owner/orders";

export const Route = createLazyFileRoute("/owner/orders")({
  component: () => (
    <OwnerLayout>
      <Orders />
    </OwnerLayout>
  )
});
