import OwnerLayout from "@/components/layout/owner";
import Products from "@/pages/owner/products";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/owner/products")({
  component: () => (
    <OwnerLayout>
      <Products />
    </OwnerLayout>
  )
});
