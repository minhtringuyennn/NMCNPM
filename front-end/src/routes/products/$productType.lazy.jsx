import UserLayout from "@/components/layout/user";
import Products from "@/pages/user/products";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products/$productType")({
  component: Index
});

function Index() {
  const { productType } = Route.useParams();

  return (
    <UserLayout>
      <Products productType={productType} />
    </UserLayout>
  );
}
