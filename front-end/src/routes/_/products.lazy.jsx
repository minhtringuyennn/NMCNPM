import UserLayout from "@/components/layout/user";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("//products")({
  component: Products
});

function Products() {
  return (
    <UserLayout>
      <div className="p-2">Hello from Products!</div>
    </UserLayout>
  );
}
