import OwnerLayout from "@/components/layout/employee";
import { createLazyFileRoute } from "@tanstack/react-router";
import Orders from "@/pages/employee/orders";

export const Route = createLazyFileRoute("/employee/orders")({
  component: () => (
    <OwnerLayout>
      <Orders />
    </OwnerLayout>
  )
});
