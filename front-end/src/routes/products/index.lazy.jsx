import UserLayout from "@/components/layout/user";
import Products from "@/pages/user/products";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products/")({
  component: Index
});

function Index() {
  return (
    <UserLayout>
      <Products />
    </UserLayout>
  );
}
