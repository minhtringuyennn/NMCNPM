import OwnerLayout from "@/components/layout/employee";
import Products from "@/pages/employee/products";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/employee/products")({
  component: () => (
    <OwnerLayout>
      <Products />
    </OwnerLayout>
  )
});
